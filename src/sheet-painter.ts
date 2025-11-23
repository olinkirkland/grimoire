import sheetData from '@/assets/data/sheet-data.json';
import talentsData from '@/assets/data/talents.json';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import Adventurer from './adventurer';
import { t } from './i18n/locale';
import { Path } from './path';
import { BASE_URL } from './router';
import { Step } from './step';
import { capitalizeFirstLetter, joinStrings, removeHtmlTags } from './utils/string-util';
import { isTalentInPath } from './utils/adventurer-util';

const SHOW_COORDS = false;
const SHOW_TEXT_BORDERS = false;
const SHOW_GRID = false;

export async function paintSheet(adventurer: Adventurer): Promise<HTMLCanvasElement> {
    const color = adventurer.options.color;
    const font = adventurer.options.font;
    const normalFont = {
        font: `32px ${font}`,
        color: color
    };

    const bigFont = {
        font: `bold 48px ${font}`,
        color: color
    };

    const smallFont = {
        font: `16px ${font}`,
        color: color
    };

    return new Promise((resolve, reject) => {
        const template = new Image();
        template.src = `${BASE_URL}assets/sheets/${adventurer.path}.png`;

        template.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = template.width;
            canvas.height = template.height;

            const roughCanvas = rough.canvas(canvas);
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(template, 0, 0);

            // Defaults
            ctx.lineWidth = 2;
            ctx.font = `32px ${font}`;
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            // Draw a guide grid every 100 pixels
            if (SHOW_GRID) drawGrid(ctx, canvas);

            const pathData = sheetData.paths[adventurer.path as keyof typeof sheetData.paths] || {};

            // Add non-path talents and notes to this array
            // Use the array later to write the notes in the notes section on the sheet
            const notesArray = [];

            // Names
            const { name, playerName } = sheetData;
            writeText(ctx, adventurer.name, name.x, name.y, name.width, normalFont);
            writeText(ctx, adventurer.playerName, playerName.x, playerName.y, playerName.width, normalFont);

            // Distinctive Features
            const { features } = sheetData;
            const combinedFeatures = joinStrings(adventurer.features, '\n');
            writeText(ctx, combinedFeatures, features.x, features.y, features.width, smallFont, 5, 'top');

            // Stats
            const { brawn, agility, wits, presence } = sheetData.stats;
            writeText(ctx, adventurer.stats.brawn.toString(), brawn.x, brawn.y, brawn.width, bigFont);
            writeText(ctx, adventurer.stats.agility.toString(), agility.x, agility.y, agility.width, bigFont);
            writeText(ctx, adventurer.stats.wits.toString(), wits.x, wits.y, wits.width, bigFont);
            writeText(ctx, adventurer.stats.presence.toString(), presence.x, presence.y, presence.width, bigFont);

            // Backgrounds
            const { background1, background2 } = sheetData;
            writeText(
                ctx,
                adventurer.background.name,
                background1.x,
                background1.y,
                background1.width,
                smallFont,
                2,
                'middle'
            );
            writeText(
                ctx,
                adventurer.heritage.name,
                background2.x,
                background2.y,
                background2.width,
                smallFont,
                3,
                'middle'
            );

            // Wises 1
            const { wises1 } = sheetData;
            const combinedWises1 = joinStrings(adventurer.background.wises);
            writeText(ctx, combinedWises1, wises1.x, wises1.y, wises1.width, smallFont, 2, 'middle');

            // Wises 2
            const { wises2 } = sheetData;
            const combinedWises2 = joinStrings(adventurer.heritage.wises);
            writeText(ctx, combinedWises2, wises2.x, wises2.y, wises2.width, smallFont, 3, 'middle');

            // Bonds
            const { bonds } = sheetData;
            for (let i = 0; i < Math.min(adventurer.bonds.length, 4); i++) {
                const bond = adventurer.bonds[i];
                const bondPoint = bonds[i];
                if (!bondPoint) continue;
                const { name, description } = bondPoint;
                writeText(ctx, bond.name, name.x, name.y, name.width, normalFont, i === 0 ? 1 : 2, 'middle');
                writeText(
                    ctx,
                    bond.description,
                    description.x,
                    description.y,
                    description.width,
                    smallFont,
                    i === 0 ? 2 : 3,
                    'middle'
                );
            }

            // Arcs
            const { arcs } = sheetData;
            adventurer.arcs.forEach((arc, i) => {
                if (i < 2) writeText(ctx, arc.description, arcs[i].x, arcs[i].y, arcs[i].width, smallFont, 2, 'top');
            });

            // Traits bubbles (filled)
            adventurer.traits.forEach((trait) => {
                const point = sheetData.traits[trait as keyof typeof sheetData.traits];
                if (point) drawRoughDot(roughCanvas, point, color);
            });

            // Not traits bubbles (slashed)
            adventurer.notTraits.forEach((trait) => {
                const point = sheetData.traits[trait as keyof typeof sheetData.traits];
                if (point) drawRoughSlash(roughCanvas, point, color);
            });

            // Desires bubbles (filled)
            adventurer.desires.forEach((desire) => {
                const point = sheetData.desires[desire as keyof typeof sheetData.desires];
                if (point) drawRoughDot(roughCanvas, point, color);
            });

            // Not desires bubbles (slashed)
            adventurer.notDesires.forEach((desire) => {
                const point = sheetData.desires[desire as keyof typeof sheetData.desires];
                if (point) drawRoughSlash(roughCanvas, point, color);
            });

            // Fill out talent bubbles
            for (const talent of adventurer.talents) {
                // If it's not a talent from the adventurer's path, bubble it in
                const talentPath = talentsData.find((t) => t.id === talent)?.source;
                if (talentPath !== adventurer.path) continue;

                // Bubble in the talent
                const point = sheetData.talents[talent as keyof typeof sheetData.talents];
                if (point) drawRoughDot(roughCanvas, point, color);

                const takenAgain = adventurer.talentsData[talent]?.takenAgain;
                if (takenAgain) {
                    const secondTalentName = talent + '-2';
                    const point2 = sheetData.talents[secondTalentName as keyof typeof sheetData.talents];
                    if (point2) drawRoughDot(roughCanvas, point2, color);
                }
            }

            // Write all talents in the notes section
            for (const [key, talent] of Object.entries(adventurer.talentsData)) {
                // if (adventurer.path && isTalentInPath(key, adventurer.path))
                switch (key) {
                    // Core Talents
                    case Step.BARDSONG:
                        // Core Talent
                        notesArray.push(
                            `${t(`Step.Bardsong.Painter.bardic-instrument`, { instrument: talent.bardicInstrument })}`
                        );
                        break;
                    case Step.FRENZY:
                        // Source
                        if (talent.frenzySources.length > 0 || talent.notFrenzySources.length > 0) {
                            if (talent.frenzySources.length > 0 && talent.notFrenzySources.length > 0) {
                                // If there are both sources and notSources
                                notesArray.push(
                                    t(`Step.Frenzy.Painter.sources`, {
                                        sources: joinStrings(
                                            talent.frenzySources.map((s: string) =>
                                                t(`Step.Frenzy.Frenzy-source.${s}`).toLowerCase()
                                            ),
                                            ` ${t('and')} `
                                        ),
                                        notSources: joinStrings(
                                            talent.notFrenzySources.map((s: string) =>
                                                t(`Step.Frenzy.Frenzy-source.${s}`).toLowerCase()
                                            ),
                                            ` ${t('and')} `
                                        )
                                    })
                                );
                            } else if (talent.notFrenzySources.length > 0) {
                                // If there are notSources only
                                notesArray.push(
                                    t(`Step.Frenzy.Painter.sources-only-yes`, {
                                        notSources: joinStrings(
                                            talent.notFrenzySources.map((s: string) =>
                                                t(`Step.Frenzy.Frenzy-source.${s}`).toLowerCase()
                                            ),
                                            ` ${t('and')} `
                                        )
                                    })
                                );
                            } else if (talent.frenzySources.length) {
                                // If there are sources only
                                notesArray.push(
                                    t(`Step.Frenzy.Painter.sources-only-no`, {
                                        sources: joinStrings(
                                            talent.frenzySources.map((s: string) =>
                                                t(`Step.Frenzy.Frenzy-source.${s}`).toLowerCase()
                                            ),
                                            ` ${t('and')} `
                                        )
                                    })
                                );
                            }
                        }

                        // Scars
                        notesArray.push(t(`Step.Frenzy.Painter.scars`, { scars: joinStrings(talent.scars) }));
                        break;
                    case Step.CHANNEL_DIVINITY:
                        // Name and Epithet
                        if (talent.god.name || talent.god.epithet) {
                            const combinedName = joinStrings([talent.god.name, talent.god.epithet], ', ');
                            const { god } = sheetData.paths.cleric;
                            writeText(ctx, combinedName, god.x, god.y, god.width, normalFont);
                        }

                        // Domains
                        talent.domains.forEach((domain: any, index: number) => {
                            const domainText = t(
                                `Step.Channel-divinity.Painter.${index === 0 ? 'major' : 'minor'}-domain`,
                                { ...domain }
                            );

                            // Write the domain in the notes section
                            notesArray.push(domainText);

                            // Write the domain in the sheet
                            const domainPoint = sheetData.paths.cleric.domains[index];
                            if (domainPoint)
                                writeText(
                                    ctx,
                                    domain.name,
                                    domainPoint.x,
                                    domainPoint.y,
                                    domainPoint.width,
                                    normalFont
                                );
                        });

                        break;
                    case Step.WILD_SHAPE:
                        // Druidic tells
                        if (talent.druidicTells.length > 0) {
                            notesArray.push(
                                `${t('Step.Wild-shape.Painter.druidic-tells', { tells: talent.druidicTells })}`
                            );
                        }
                        break;
                    case Step.WEAPON_MASTERY:
                        // Core Talent
                        const { style, origin } = talent;
                        if (style.length > 0) {
                            const styleKey = style as keyof (typeof sheetData.paths.fighter)['weapon-mastery'];
                            const point = sheetData.paths.fighter['weapon-mastery'][styleKey];
                            if (point) drawRoughCircle(roughCanvas, point, color, point.width, point.height);
                        }
                        if (origin.length > 0)
                            notesArray.push(`${t('Step.Weapon-mastery.Painter.weapon-origin', { origin })}`);
                        break;
                    case Step.DISCIPLINE:
                        const { concepts, stances, weapons } = talent.martialArtsStyle;
                        const partsArray = [];
                        if (concepts.length > 0) partsArray.push(t('Step.Discipline.Painter.concepts', { concepts }));
                        if (stances.length > 0) partsArray.push(t('Step.Discipline.Painter.stances', { stances }));
                        if (weapons.length > 0) partsArray.push(t('Step.Discipline.Painter.weapons', { weapons }));
                        notesArray.push(
                            t(`Step.Discipline.Painter.martial-arts-style`, {
                                style: joinStrings(partsArray)
                            })
                        );
                        break;
                    case Step.OATHSWORN:
                        // Enter oath tenets
                        const { tenets } = talent;
                        for (let i = 0; i < Math.min(tenets.length, 3); i++) {
                            const tenet = tenets[i];
                            const { x, y, width, maxLines } = sheetData.paths.paladin.oathsworn.tenets[i];
                            writeText(ctx, tenet, x, y, width, smallFont, maxLines, 'middle');
                        }
                        break;
                    case Step.HUNTERS_MARK:
                        const { traps } = talent;
                        if (traps.length > 0) {
                            notesArray.push(
                                t(`Step.Hunters-mark.Painter.traps`, {
                                    traps: joinStrings(traps)
                                })
                            );
                        }

                        break;
                    case Step.EXPERTISE:
                        // Skillset
                        const { skillset } = talent;
                        if (skillset === 'skullduggery')
                            drawRoughDot(roughCanvas, sheetData.paths.rogue.skillset.skullduggery, color);
                        if (skillset === 'assassination')
                            drawRoughDot(roughCanvas, sheetData.paths.rogue.skillset.assassination, color);

                        // Guild
                        const { guildTraits, notGuildTraits } = talent;
                        if (guildTraits.length > 0) {
                            notesArray.push(
                                t(`Step.Expertise.Painter.guild-traits`, {
                                    traits: joinStrings(
                                        guildTraits.map((trait: string) =>
                                            t(`Step.Expertise.Thieves-guild.Table.${trait}`)
                                        )
                                    )
                                })
                            );
                        }
                        if (notGuildTraits.length > 0) {
                            notesArray.push(
                                t(`Step.Expertise.Painter.not-guild-traits`, {
                                    traits: joinStrings(
                                        notGuildTraits.map((trait: string) =>
                                            t(`Step.Expertise.Thieves-guild.Table.${trait}`)
                                        )
                                    )
                                })
                            );
                        }

                        // Criminal history
                        const { crime } = talent;
                        if (crime.length > 0) {
                            notesArray.push(
                                t(`Step.Expertise.Painter.criminal-history`, {
                                    crime
                                })
                            );
                        }
                        break;
                    case Step.SORCERY:
                        const sorceryMagicPaths = talent.magicPaths;
                        const sorceryTechniques = talent.techniques;
                        const sorceryPathsAndTechniques = [];
                        if (sorceryMagicPaths.length > 0) {
                            sorceryPathsAndTechniques.push(
                                t(`Step.Sorcery.Painter.magic-paths`, {
                                    magicPaths: joinStrings(sorceryMagicPaths)
                                })
                            );
                        }
                        if (sorceryTechniques.length > 0) {
                            sorceryPathsAndTechniques.push(
                                t(`Step.Sorcery.Painter.techniques`, {
                                    techniques: joinStrings(sorceryTechniques)
                                })
                            );
                        }
                        if (sorceryPathsAndTechniques.length > 0)
                            writeText(
                                ctx,
                                joinStrings(sorceryPathsAndTechniques, ' ... '),
                                sheetData.paths.sorcerer.sorcery.x,
                                sheetData.paths.sorcerer.sorcery.y,
                                sheetData.paths.sorcerer.sorcery.width,
                                smallFont,
                                2,
                                'middle'
                            );
                        break;
                    case Step.PACT:
                        // name, nature, desires, communication, followerSize, knownFacts, color
                        const { patron } = talent;
                        notesArray.push(t(`Step.Pact.Painter.patron`, { ...patron }));
                        break;
                    case Step.SPELLCRAFT:
                        const spellcraftTheorems = talent.theorems;
                        notesArray.push(
                            t(`Step.Spellcraft.Painter.theorems`, {
                                theorems: joinStrings(
                                    spellcraftTheorems.map((theorem: { name: string; magicSchool: string }) => {
                                        const { name, magicSchool } = theorem;
                                        return `${name} (${magicSchool})`;
                                    })
                                )
                            })
                        );
                        break;
                    case Step.CUSTOM:
                        writeText(
                            ctx,
                            talent.name,
                            sheetData.paths.adventurer.talent.name.x,
                            sheetData.paths.adventurer.talent.name.y,
                            sheetData.paths.adventurer.talent.name.width,
                            bigFont,
                            1,
                            'top'
                        );

                        if (talent.description.length > 0 || talent.growth.length > 0)
                            writeText(
                                ctx,
                                talent.description + '\n' + t(`Step.Custom.Growth.label`) + ':' + talent.growth,
                                sheetData.paths.adventurer.talent.description.x,
                                sheetData.paths.adventurer.talent.description.y,
                                sheetData.paths.adventurer.talent.description.width,
                                smallFont,
                                sheetData.paths.adventurer.talent.description.maxLines,
                                'top'
                            );

                        // Draw a white rectangle
                        const rect = sheetData.paths.adventurer.rectangle;
                        ctx.fillStyle = 'white';
                        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

                        notesArray.push(t(`Step.Custom.Painter.talents-heading`));

                        // Add a list of all talent names to the notes
                        const talentNamesAndDescriptions = adventurer.talents.map((l) => {
                            return (
                                t(`Step.Talents.${capitalizeFirstLetter(l)}.name`).toUpperCase() +
                                ': ' +
                                removeHtmlTags(t(`Step.Talents.${capitalizeFirstLetter(l)}.description`))
                            );
                        });

                        notesArray.push(joinStrings(talentNamesAndDescriptions, '\n'));
                        notesArray.push('   ');
                        notesArray.push(t(`Step.Custom.Painter.notes-heading`));

                        break;

                    // Talents
                    case Step.BARDIC_LORE:
                        if (talent.wises.length > 0)
                            notesArray.push(
                                `${t('Step.Bardic-lore.Painter.wises', { wises: joinStrings(adventurer.talentsData[Step.BARDIC_LORE].wises) })}`
                            );
                        break;
                    case Step.WARSONGS:
                        const combinedSongs = joinStrings(talent.songs);
                        notesArray.push(`${t('Step.Warsongs.Painter.warsongs', { warsongs: combinedSongs })}`);
                        break;
                    case Step.TRUE_SHAPE:
                        const { shape, wildTalents } = talent;
                        if (shape.length > 0) {
                            if (wildTalents.length > 0) {
                                notesArray.push(
                                    `${t('Step.True-shape.Painter.true-shape', { shape, wildTalents: joinStrings(wildTalents, ', ') })}`
                                );
                            } else {
                                notesArray.push(
                                    `${t('Step.True-shape.Painter.true-shape-no-wild-talent', { shape: t(`Step.True-shape.${shape}`) })}`
                                );
                            }
                        }
                        break;
                    case Step.ARCANE_TRAINING:
                        const { theorems } = talent;
                        if (theorems.length > 0) {
                            const theoremsStrings = theorems.map((theorem: { name: string; magicSchool: string }) => {
                                const { name, magicSchool } = theorem;
                                return name + ` (${magicSchool})`;
                            });

                            if (adventurer.path === Path.FIGHTER) {
                                writeText(
                                    ctx,
                                    `${t('Step.Arcane-training.Painter.theorems', { theorems: joinStrings(theoremsStrings) })}`,
                                    sheetData.paths.fighter.theorems.x,
                                    sheetData.paths.fighter.theorems.y,
                                    sheetData.paths.fighter.theorems.width,
                                    smallFont,
                                    2
                                );
                            } else {
                                notesArray.push(
                                    `${t('Step.Arcane-training.Painter.theorems', { theorems: joinStrings(theoremsStrings) })}`
                                );
                            }
                        }
                        break;
                    case Step.PRIMORDIAL_FORCES:
                        const { forces } = talent;
                        const forcesArray: string[] = [];
                        forces.forEach((force: 'fire' | 'earth' | 'air' | 'water') => {
                            const forcePoint = sheetData.paths.monk['primordial-forces'][force];
                            if (adventurer.path === Path.MONK && forcePoint) {
                                drawRoughCircle(
                                    roughCanvas,
                                    { x: forcePoint.x, y: forcePoint.y },
                                    color,
                                    forcePoint.width,
                                    forcePoint.height
                                );
                            }

                            forcesArray.push(t(`Step.Primordial-forces.${force}`));
                        });

                        if (adventurer.path !== Path.MONK) {
                            notesArray.push(
                                t(`Step.Primordial-forces.Painter.primordial-forces`, {
                                    forces: joinStrings(forcesArray)
                                })
                            );
                        }
                        break;
                    case Step.PRIMORDIAL_BONDS:
                        const primordialBonds = Object.values(talent.bonds).map((bond) => {
                            const { name, intensity, nature } = bond as {
                                name: string;
                                intensity: string;
                                nature: string;
                            };
                            const intensityAndNature = `${joinStrings([intensity, nature], ' ')}`;
                            return intensity || nature ? `${name} (${intensityAndNature})` : name;
                        });

                        notesArray.push(
                            t(`Step.Primordial-bonds.Painter.bonds`, { bonds: joinStrings(primordialBonds) })
                        );
                        break;
                    case Step.DIVINE_BLESSING:
                        // God
                        const { god } = talent;
                        const combinedName = joinStrings([god.name, god.epithet], ', ');
                        notesArray.push(`${t('Step.Divine-blessing.Painter.god', { name: combinedName })}`);
                        // Domain
                        const { domain } = talent;
                        if (domain) {
                            // Write the domain in the sheet
                            const domainPoint = sheetData.paths.paladin['divine-blessing'].domain;
                            if (adventurer.path === Path.PALADIN && domainPoint) {
                                writeText(
                                    ctx,
                                    domain.name,
                                    domainPoint.x,
                                    domainPoint.y,
                                    domainPoint.width,
                                    normalFont
                                );
                            }
                            // Write the domain in the notes section
                            const domainText = t('Step.Channel-divinity.Painter.minor-domain', { ...domain });
                            notesArray.push(domainText);
                        }
                        break;
                    case Step.ANIMAL_COMPANION:
                        const { tricks, flaws } = talent;
                        // Name and description
                        if (!talent.name && !talent.description) {
                            notesArray.push(t(`Step.Animal-companion.Painter.no-animal-name`));
                        } else {
                            notesArray.push(
                                t(`Step.Animal-companion.Painter.animal-name`, {
                                    name: joinStrings([talent.name, talent.description])
                                })
                            );
                        }
                        // Tricks
                        const tricksAndFlaws = [];
                        if (tricks.length > 0) {
                            tricksAndFlaws.push(
                                t(`Step.Animal-companion.Painter.tricks`, {
                                    tricks: joinStrings(tricks)
                                })
                            );
                        }
                        // Flaws
                        if (flaws.length > 0) {
                            tricksAndFlaws.push(
                                t(`Step.Animal-companion.Painter.flaws`, {
                                    flaws: joinStrings(flaws)
                                })
                            );
                        }

                        if (tricksAndFlaws.length > 0) notesArray.push(joinStrings(tricksAndFlaws, ' ... '));
                        break;
                    case Step.TROPHIES:
                        const { trophies } = talent;
                        const trophiesArray = trophies.map((trophy: { name: string; description: string }) => {
                            const { name, description } = trophy;
                            return name + (description ? ` (${description})` : '');
                        });

                        notesArray.push(
                            t(`Step.Trophies.Painter.trophies`, {
                                trophies: joinStrings(trophiesArray)
                            })
                        );
                        break;
                    case Step.ELDRITCH_AFFINITY:
                        const { magicPaths, techniques } = talent;
                        const magicPathsAndTechniques = [];
                        if (magicPaths.length > 0) {
                            magicPathsAndTechniques.push(
                                t(`Step.Eldritch-affinity.Painter.magic-paths`, {
                                    magicPaths: joinStrings(magicPaths)
                                })
                            );
                        }
                        if (techniques.length > 0) {
                            magicPathsAndTechniques.push(
                                t(`Step.Eldritch-affinity.Painter.techniques`, {
                                    techniques: joinStrings(techniques)
                                })
                            );
                        }
                        if (magicPathsAndTechniques.length > 0)
                            writeText(
                                ctx,
                                joinStrings(magicPathsAndTechniques, ' ... '),
                                sheetData.paths.rogue['eldritch-affinity'].x,
                                sheetData.paths.rogue['eldritch-affinity'].y,
                                sheetData.paths.rogue['eldritch-affinity'].width,
                                smallFont,
                                2,
                                'middle'
                            );
                        break;
                    case Step.ELDRITCH_GROWTH:
                        notesArray.push(
                            t(`Step.Eldritch-growth.Painter.eldritch-growth`, {
                                growth: talent.name
                            })
                        );
                        break;
                    case Step.WISPS:
                        const wispTraits = talent.traits;
                        if (wispTraits.length > 0) {
                            notesArray.push(
                                t(`Step.Wisps.Painter.wisp-traits`, {
                                    traits: joinStrings(
                                        wispTraits.map((trait: string) => t(`Step.Wisps.Traits.${trait}`))
                                    )
                                })
                            );
                        }
                        break;
                    case Step.OTHERWORLDLY_FORM:
                        const otherworldlyFormEffects = talent.effects;
                        console.log(otherworldlyFormEffects);
                        if (adventurer.path === Path.WARLOCK) {
                            // TODO: Circle them
                            otherworldlyFormEffects.forEach((effect: string) => {
                                const point =
                                    sheetData.paths.warlock['otherworldly-form'][
                                        effect as keyof (typeof sheetData.paths.warlock)['otherworldly-form']
                                    ];
                                drawRoughCircle(roughCanvas, point, color, point.width, point.height);
                            });
                        } else {
                            notesArray.push(
                                t(`Step.Otherworldly-form.Painter.otherworldly-form`, {
                                    effects: joinStrings(otherworldlyFormEffects)
                                })
                            );
                        }
                        break;
                    case Step.ARCANE_SPECIALTY:
                        const { magicSchool } = talent;
                        notesArray.push(
                            t(`Step.Arcane-specialty.Painter.arcane-specialty`, {
                                magicSchool: t(
                                    `Step.Spellcraft.Magic-schools.${capitalizeFirstLetter(magicSchool)}.label`
                                )
                            })
                        );
                        break;
                    case Step.ALCHEMIST:
                        const recipes = talent.theorems;
                        if (recipes.length > 0) {
                            notesArray.push(
                                t(`Step.Alchemist.Painter.recipes`, {
                                    recipes: joinStrings(
                                        recipes.map((recipe: { name: string; magicSchool: string }) => {
                                            const { name, magicSchool } = recipe;
                                            return `${name} (${magicSchool})`;
                                        })
                                    )
                                })
                            );
                        }
                        break;
                    case Step.FAMILIAR:
                        notesArray.push(
                            t(`Step.Familiar.Painter.familiar`, {
                                name: talent.name,
                                description: talent.description
                            })
                        );
                        break;
                    case Step.MASTERED_THEOREM:
                        const theoremIndex = talent.theorem;
                        const masteredTheorem = adventurer.talentsData[Step.SPELLCRAFT].theorems[theoremIndex];
                        notesArray.push(
                            t(`Step.Mastered-theorem.Painter.mastered-theorem`, {
                                theorem: masteredTheorem.name,
                                magicSchool: t(
                                    `Step.Spellcraft.Magic-schools.${capitalizeFirstLetter(masteredTheorem.magicSchool)}.label`
                                )
                            })
                        );
                        break;
                }
            }

            // Write non-path talents at beginning
            const nonPathTalents = adventurer.talents.filter((talent) => !isTalentInPath(talent, adventurer.path!));
            if (nonPathTalents.length > 0)
                notesArray.unshift(
                    t(`Step.Talents.Painter.non-path-talents`, {
                        talents: joinStrings(
                            nonPathTalents.map((l) => t(`Step.Talents.${capitalizeFirstLetter(l)}.name`))
                        )
                    })
                );

            // Write notes, use the path notes if available
            const notes = pathData.notes ? pathData.notes : sheetData.notes;
            writeText(ctx, joinStrings(notesArray, '\n'), notes.x, notes.y, notes.width, smallFont, notes.maxLines);

            resolve(canvas);
        };

        template.onerror = (error) => {
            reject(new Error(`Failed to load image: ${template.src}`));
        };
    });
}

function drawGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.5;

    for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    ctx.restore();
}

function drawRoughDot(roughCanvas: RoughCanvas, point: { x: number; y: number }, color: string, size: number = 16) {
    roughCanvas.ellipse(point.x, point.y, size, size, {
        fill: color,
        fillStyle: 'solid',
        stroke: color,
        strokeWidth: 2,
        roughness: 1,
        bowing: 0
    });
}

function drawRoughSlash(roughCanvas: RoughCanvas, point: { x: number; y: number }, color: string, size: number = 16) {
    // Diagonal slash going from bottom left to top right
    roughCanvas.linearPath(
        [
            [point.x - size / 2, point.y + size / 2],
            [point.x + size / 2, point.y - size / 2]
        ],
        {
            stroke: color,
            strokeWidth: 2,
            roughness: 1,
            bowing: 0
        }
    );
}

function drawRoughCircle(
    roughCanvas: RoughCanvas,
    point: { x: number; y: number },
    color: string,
    width: number = 40,
    height: number = 16
) {
    // draw a dot at the center if text borders are enabled
    if (SHOW_COORDS) {
        roughCanvas.ellipse(point.x, point.y, 8, 8, {
            fill: '#00ff00',
            fillStyle: 'solid',
            stroke: '#ff0000',
            strokeWidth: 2,
            roughness: 0,
            bowing: 0
        });
    }

    roughCanvas.ellipse(point.x, point.y, width, height, {
        stroke: color,
        strokeWidth: 2,
        roughness: 1,
        bowing: 0
    });
}

function writeText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    width: number,
    options: { font: string; color: string },
    maxLines: number = 1,
    verticalAlign: 'top' | 'middle' | 'bottom' = 'top'
) {
    // Get the current font, size, and color to restore later
    const originalFont = ctx.font;
    const originalColor = ctx.fillStyle;
    const originalLineWidth = ctx.lineWidth;
    const originalStrokeStyle = ctx.strokeStyle;
    const originalFillStyle = ctx.fillStyle;

    ctx.font = options.font;
    ctx.fillStyle = options.color;

    // Break text into lines if necessary
    const lines = breakIntoLines(ctx, text, width, maxLines);
    // Get the font size (number) from the font string
    const fontSize = parseInt(ctx.font.match(/(\d+)/)?.[0] || '32');
    const lineHeight = fontSize * 1.2;
    const totalHeight = lineHeight * lines.length;

    let startY = y;
    if (verticalAlign === 'middle') {
        startY = y - totalHeight / 2 + lineHeight / 2;
    } else if (verticalAlign === 'bottom') {
        startY = y - totalHeight + lineHeight;
    }

    lines.forEach((line, i) => {
        ctx.fillText(line, x, startY + i * lineHeight);
    });

    if (SHOW_TEXT_BORDERS) {
        // Draw a rectangle around the text (use width and total height)
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'transparent';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, startY - fontSize, width, totalHeight);
        // Draw a red rectangle around each text line
        ctx.strokeStyle = 'red';
        lines.forEach((line, i) => {
            const textWidth = ctx.measureText(line).width;
            ctx.strokeRect(x, startY - fontSize + i * lineHeight, textWidth, fontSize);
        });
    }

    // Restore the original font, size, and color
    ctx.font = originalFont;
    ctx.fillStyle = originalColor;
    ctx.lineWidth = originalLineWidth;
    ctx.strokeStyle = originalStrokeStyle;
    ctx.fillStyle = originalFillStyle;
}

// Function to fit text within a specified width
// and break it into multiple lines if necessary
function breakIntoLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number = -1
): string[] {
    // If maxLines is < 0, we don't limit the number of lines
    // If the lines are limited, use fitText to fit the text for the last line
    const lines: string[] = [];
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
        // If it contains a line break, split the line
        if (word.includes('\n')) {
            const parts = word.split('\n');
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const testLine = currentLine + part + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && currentLine.length > 0) {
                    lines.push(currentLine.trim());
                    currentLine = part + ' ';
                } else {
                    currentLine = testLine;
                }
                if (i < parts.length - 1) {
                    lines.push(currentLine.trim());
                    currentLine = '';
                }
            }
            continue;
        }
        // Otherwise, check if the word fits in the current line
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    }

    if (currentLine.length > 0) lines.push(currentLine.trim());

    // If maxLines is set, remove lines so that only maxLines remain, and fit the last line
    if (maxLines > 0 && lines.length > maxLines) {
        // Remove extra lines, keep only the first (maxLines - 1)
        const kept = lines.slice(0, maxLines - 1);
        // Combine the rest into one string for the last line
        const lastLine = lines.slice(maxLines - 1).join(' ');
        const fittedText = fitText(ctx, lastLine, maxWidth);
        kept.push(fittedText);
        return kept;
    }
    return lines;
}

// Adapted from https://stackoverflow.com/a/10511598/1546303
// Ensures that the text fits within the specified width, adding ellipsis if necessary
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    var width = ctx.measureText(text).width;
    var ellipsis = '...';
    var ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width <= maxWidth || width <= ellipsisWidth) {
        return text;
    } else {
        var len = text.length;
        while (width >= maxWidth - ellipsisWidth && len-- > 0) {
            text = text.substring(0, len);
            width = ctx.measureText(text).width;
        }
        return text + ellipsis;
    }
}
