import { Step } from './step';

export const Path = {
    BARD: 'bard',
    BERSERKER: 'berserker',
    CLERIC: 'cleric',
    DRUID: 'druid',
    FIGHTER: 'fighter',
    MONK: 'monk',
    PALADIN: 'paladin',
    RANGER: 'ranger',
    ROGUE: 'rogue',
    SORCERER: 'sorcerer',
    WARLOCK: 'warlock',
    WIZARD: 'wizard'
};

export const CoreTalentsByPath = {
    [Path.BARD]: Step.BARDSONG,
    [Path.BERSERKER]: Step.FRENZY,
    [Path.CLERIC]: Step.CHANNEL_DIVINITY,
    [Path.DRUID]: Step.WILD_SHAPE,
    [Path.FIGHTER]: Step.WEAPON_MASTERY,
    [Path.MONK]: Step.DISCIPLINE,
    [Path.PALADIN]: Step.OATHSWORN,
    [Path.RANGER]: Step.HUNTERS_MARK,
    [Path.ROGUE]: Step.EXPERTISE,
    [Path.SORCERER]: Step.SORCERY,
    [Path.WARLOCK]: Step.PACT,
    [Path.WIZARD]: Step.SPELLCRAFT
};
