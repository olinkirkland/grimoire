import talentsData from '@/assets/data/talents.json';
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { CoreTalentsByPath, Step } from '@/step';
import { v4 as uuid } from 'uuid';
import { capitalizeFirstLetter } from './string-util';

export const Modify = {
    STATS: 'modify-stats'
};

/**
 * Import an adventurer from a URI.
 * @param uri - The URI string to import.
 * @returns The imported adventurer or null if the import failed.
 */
export function decodeURI(uri: string): Adventurer | null {
    // Convert URL-safe Base64 back to standard Base64
    const base64String = uri
        .replace(/-/g, '+') // Replace '-' with '+'
        .replace(/_/g, '/'); // Replace '_' with '/'

    // Decode Base64 to UTF-8 string
    const jsonString = new TextDecoder().decode(Uint8Array.from(atob(base64String), (char) => char.charCodeAt(0)));

    // Parse JSON string to object
    return JSON.parse(jsonString);
}

/**
 * Export an adventurer to a URI for sharing or saving.
 * @param adventurer - The adventurer to export.
 * @returns The URI string.
 */
export function encodeURI(adventurer: Adventurer): string {
    // Convert JSON object to a string
    const copy = { ...adventurer };
    copy.id = uuid();
    const jsonString = JSON.stringify(adventurer);

    // Encode the string to UTF-8 and then Base64
    const base64String = btoa(
        new TextEncoder().encode(jsonString).reduce((acc, byte) => acc + String.fromCharCode(byte), '')
    );

    // Make the Base64 URL-safe
    const urlSafeBase64 = base64String
        .replace(/\+/g, '-') // Replace '+' with '-'
        .replace(/\//g, '_') // Replace '/' with '_'
        .replace(/=+$/, ''); // Remove trailing '='

    return urlSafeBase64;
}

/**
 * Use Markov chains to generate a random adventurer name.
 * @param names - An array of names to use as a base for the Markov chain.
 * @returns A random name generated using the Markov chain algorithm.
 */
export function generateMarkovName(names: string[]): string | null {
    if (names.length === 0) return null;
    const model: Record<string, string[]> = {};

    // Determine the order of the Markov chain by the length of the average name
    const totalLength = names.reduce((sum, name) => sum + name.length, 0);
    const averageLength = Math.floor(totalLength / names.length);
    const order = averageLength > 6 ? 3 : 2;
    console.log(`markov order is ${order} because average length is ${averageLength}`);

    const count = 5; // Number of unique names to generate

    // Build model
    for (const name of names) {
        const padded = '^'.repeat(order) + name.toLowerCase() + '$';
        for (let i = 0; i <= padded.length - order; i++) {
            const prefix = padded.slice(i, i + order);
            const nextChar = padded[i + order];
            if (!model[prefix]) model[prefix] = [];
            model[prefix].push(nextChar);
        }
    }

    const results = new Set<string>();

    while (results.size < count) {
        let prefix = '^'.repeat(order);
        let name = '';
        let attempts = 0;
        while (true) {
            attempts++;
            const possible = model[prefix];
            if (!possible) break;
            const next = possible[Math.floor(Math.random() * possible.length)];
            if (next === '$') break;
            name += next;
            prefix = prefix.slice(1) + next;
        }

        const finalName = name.charAt(0).toUpperCase() + name.slice(1);
        if (!names.includes(finalName) && finalName.length >= 3) {
            results.add(finalName);
        }
    }

    const name = Array.from(results)[0];
    // Capitalize each word
    const words = name.split(' ');
    for (let i = 0; i < words.length; i++) words[i] = capitalizeFirstLetter(words[i]);
    return words.join(' ');
}

/**
 * Return a template for talent data, if it's available.
 * @param name - The talent key (e.g., bardsong, frenzy)
 * @returns The template string or null if not available.
 */
export function getTalentTemplate(key: string): any | null {
    switch (key) {
        case Step.BARDSONG:
            return { bardicInstrument: '' };
        case Step.FRENZY:
            return {
                frenzySources: [],
                notFrenzySources: [],
                scars: ['', '', '']
            };
        case Step.CHANNEL_DIVINITY:
            return {
                god: {
                    name: '',
                    epithet: ''
                },
                holySymbol: '',
                domains: [
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    },
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    },
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    }
                ]
            };
        case Step.WILD_SHAPE:
            return {
                druidicTells: ''
            };
        case Step.WEAPON_MASTERY:
            return {
                origin: '',
                originCrucible: '',
                style: ''
            };
        case Step.DISCIPLINE:
            return {
                martialArtsStyle: {
                    concepts: '',
                    stances: '',
                    weapons: ''
                },
                martialArtsCrucibles: {
                    concepts: '',
                    stances: '',
                    weapons: ''
                }
            };
        case Step.OATHSWORN:
            return {
                builder: '',
                tenets: ['', '', '']
            };
        case Step.HUNTERS_MARK:
            return {
                builder: '',
                traps: ['', '', '']
            };
        case Step.EXPERTISE:
            return {
                skillset: '',
                guildTraits: [],
                notGuildTraits: [],
                crimeBuilder: '',
                crime: ''
            };
        case Step.SORCERY:
            return {
                magicPaths: [],
                techniques: [],
                wildSurgeCrucibles: {
                    a: '',
                    b: ''
                }
            };
        case Step.PACT:
            return {
                patron: {
                    name: '',
                    communication: '',
                    followerSize: 'some',
                    details: '',
                    color: '',
                    patronCrucibles: {
                        nature: '',
                        desires: ''
                    }
                }
            };
        case Step.SPELLCRAFT:
            return {
                spellCrucibles: {
                    style: '',
                    essence: '',
                    focus: ''
                },
                builder: {
                    theorem: '',
                    magicSchool: ''
                },
                theorems: []
            };
        case Step.BARDIC_LORE:
            return {
                wises: ['', '', '']
            };
        case Step.JACK_OF_ALL_TRADES:
            return {
                [Modify.STATS]: 1
            };
        case Step.WARSONGS:
            return {
                songs: ['', '', '']
            };
        case Step.HERBALISM:
            return {
                crucibles: {
                    prefix: '',
                    suffix: ''
                }
            };
        case Step.PRIMORDIAL_FORCES:
            return {
                takenAgain: false,
                forces: [] // fire, water, earth, air
            };
        case Step.ANIMAL_COMPANION:
            return {
                name: '',
                description: '',
                takenAgain: false,
                tricks: [],
                flaws: []
            };
        case Step.TROPHIES:
            return {
                trophies: []
            };
        case Step.ELDRITCH_GROWTH:
            return {
                name: ''
            };
        case Step.OTHERWORLDLY_FORM:
            return {
                effects: []
            };
        case Step.ARCANE_SPECIALTY:
            return {
                magicSchool: ''
            };
        case Step.MASTERED_THEOREM:
            return {
                theorem: -1
            };
        case Step.PRIMORDIAL_BONDS:
            return {
                bonds: {
                    fire: {
                        name: t(`Step.Primordial-bonds.fire`),
                        intensity: '',
                        nature: '',
                        description: ''
                    },
                    water: {
                        name: t(`Step.Primordial-bonds.water`),
                        intensity: '',
                        nature: '',
                        description: ''
                    },
                    earth: {
                        name: t(`Step.Primordial-bonds.earth`),
                        intensity: '',
                        nature: '',
                        description: ''
                    },
                    air: {
                        name: t(`Step.Primordial-bonds.air`),
                        intensity: '',
                        nature: '',
                        description: ''
                    }
                }
            };
        case Step.TRUE_SHAPE:
            return {
                shape: '',
                wildTalents: ['', '']
            };
        case Step.ARCANE_TRAINING:
            return {
                spellCrucibles: {
                    style: '',
                    essence: '',
                    focus: ''
                },
                builder: {
                    theorem: '',
                    magicSchool: ''
                },
                theorems: []
            };
        case Step.DIVINE_BLESSING:
            return {
                god: {
                    name: '',
                    epithet: ''
                },
                holySymbol: '',
                domain: {
                    name: '',
                    description: '',
                    tenets: '',
                    magic: ''
                }
            };
        case Step.ELDRITCH_AFFINITY:
            return { magicPaths: [], techniques: [] };
        case Step.WISPS:
            return { traits: [] };
        case Step.ALCHEMIST:
            return {
                spellCrucibles: {
                    style: '',
                    essence: '',
                    focus: ''
                },
                builder: {
                    theorem: '',
                    magicSchool: ''
                },
                theorems: []
            };
        case Step.FAMILIAR:
            return {
                name: '',
                description: ''
            };
    }

    return null;
}

/**
 * Return whether or not a talent belongs to a path (source).
 * @param key - The talent key (e.g., bardic-instrument, frenzy)
 * @param path - The path key (e.g., bard, druid)
 * @returns True if the talent belongs to the path, false otherwise.
 */
export function isTalentInPath(talent: string, path: string): boolean {
    // Core talent?
    if (CoreTalentsByPath[path] === talent) return true;
    // Non-core talent, look for source
    const source = talentsData.find((t) => t.id === talent)?.source;
    return !!source && source === path;
}
