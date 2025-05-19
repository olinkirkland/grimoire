import { Path } from '@/path';
import BardsongStep from './components/steps/core-talents/BardsongStep.vue';
import ChannelDivinityStep from './components/steps/core-talents/ChannelDivinityStep.vue';
import DisciplineStep from './components/steps/core-talents/DisciplineStep.vue';
import ExpertiseStep from './components/steps/core-talents/ExpertiseStep.vue';
import FrenzyStep from './components/steps/core-talents/FrenzyStep.vue';
import HuntersMarkStep from './components/steps/core-talents/HuntersMarkStep.vue';
import OathswornStep from './components/steps/core-talents/OathswornStep.vue';
import PactStep from './components/steps/core-talents/PactStep.vue';
import SorceryStep from './components/steps/core-talents/SorceryStep.vue';
import SpellcraftStep from './components/steps/core-talents/SpellcraftStep.vue';
import WeaponMasteryStep from './components/steps/core-talents/WeaponMasteryStep.vue';
import WildShapeStep from './components/steps/core-talents/WildShapeStep.vue';
import ArcsStep from './components/steps/regular/ArcsStep.vue';
import BackgroundStep from './components/steps/regular/BackgroundStep.vue';
import BondsStep from './components/steps/regular/BondsStep.vue';
import HeritageStep from './components/steps/regular/HeritageStep.vue';
import PathStep from './components/steps/regular/PathStep.vue';
import PersonalityStep from './components/steps/regular/PersonalityStep.vue';
import ReviewStep from './components/steps/regular/ReviewStep.vue';
import StatsStep from './components/steps/regular/StatsStep.vue';
import TalentsStep from './components/steps/regular/TalentsStep.vue';
import AnimalCompanionStep from './components/steps/talents/AnimalCompanionStep.vue';
import BardicLoreStep from './components/steps/talents/BardicLoreStep.vue';
import HerbalismStep from './components/steps/talents/HerbalismStep.vue';
import PrimordialForcesStep from './components/steps/talents/PrimordialForcesStep.vue';
import WarsongsStep from './components/steps/talents/WarsongsStep.vue';

export const Step = {
    PERSONALITY: 'personality',
    HERITAGE: 'heritage',
    BACKGROUND: 'background',
    BACKGROUND_2: 'background-2',
    PATH: 'path',
    TALENTS: 'talents',
    STATS: 'stats',
    ARCS: 'arcs',
    BONDS: 'bonds',
    REVIEW: 'review',

    // Core Talents
    BARDSONG: 'bardsong',
    FRENZY: 'frenzy',
    CHANNEL_DIVINITY: 'channel-divinity',
    WILD_SHAPE: 'wild-shape',
    WEAPON_MASTERY: 'weapon-mastery',
    DISCIPLINE: 'discipline',
    OATHSWORN: 'oathsworn',
    HUNTERS_MARK: 'hunters-mark',
    EXPERTISE: 'expertise',
    SORCERY: 'sorcery',
    PACT: 'pact',
    SPELLCRAFT: 'spellcraft',

    // Talents
    BARDIC_LORE: 'bardic-lore',
    JACK_OF_ALL_TRADES: 'jack-of-all-trades',
    WARSONGS: 'warsongs',
    HERBALISM: 'herbalism',
    PRIMORDIAL_FORCES: 'primordial-forces', // TODO: upg2
    ANIMAL_COMPANION: 'animal-companion', // TODO: upg2
    PRIMORDIAL_BONDS: 'primordial-bonds',
    TRUE_SHAPE: 'true-shape',
    ARCANE_TRAINING: 'arcane-training',
    DIVINE_BLESSING: 'divine-blessing',
    TROPHIES: 'trophies',
    ELDRITCH_AFFINITY: 'eldritch-affinity',
    ELDRITCH_GROWTH: 'eldritch-growth',
    WISPS: 'wisps',
    OTHERWORLDLY_FORM: 'otherworldly-form',
    ALCHEMIST: 'alchemist',
    ARCANE_SPECIALITY: 'arcane-speciality',
    FAMILIAR: 'familiar',
    MASTERED_THEOREM: 'mastered-theorem'
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

export const StepType = {
    MAIN: 'main',
    CORE_TALENT: 'core-talent',
    TALENT: 'talent',
    OTHER: 'other'
};

export const StepDefinitions: Record<string, { component: any; type: string }> = {
    [Step.PERSONALITY]: {
        component: PersonalityStep,
        type: StepType.MAIN
    },
    [Step.HERITAGE]: {
        component: HeritageStep,
        type: StepType.MAIN
    },
    [Step.BACKGROUND]: {
        component: BackgroundStep,
        type: StepType.MAIN
    },
    [Step.BACKGROUND_2]: {
        component: BackgroundStep,
        type: StepType.MAIN
    },
    [Step.PATH]: {
        component: PathStep,
        type: StepType.MAIN
    },
    [Step.TALENTS]: {
        component: TalentsStep,
        type: StepType.MAIN
    },
    [Step.STATS]: {
        component: StatsStep,
        type: StepType.MAIN
    },
    [Step.ARCS]: {
        component: ArcsStep,
        type: StepType.MAIN
    },
    [Step.BONDS]: {
        component: BondsStep,
        type: StepType.MAIN
    },
    [Step.REVIEW]: {
        component: ReviewStep,
        type: StepType.MAIN
    },

    // Core Talents
    [Step.BARDSONG]: {
        component: BardsongStep,
        type: StepType.CORE_TALENT
    },
    [Step.FRENZY]: {
        component: FrenzyStep,
        type: StepType.CORE_TALENT
    },
    [Step.CHANNEL_DIVINITY]: {
        component: ChannelDivinityStep,
        type: StepType.CORE_TALENT
    },
    [Step.WILD_SHAPE]: {
        component: WildShapeStep,
        type: StepType.CORE_TALENT
    },
    [Step.WEAPON_MASTERY]: {
        component: WeaponMasteryStep,
        type: StepType.CORE_TALENT
    },
    [Step.DISCIPLINE]: {
        component: DisciplineStep,
        type: StepType.CORE_TALENT
    },
    [Step.OATHSWORN]: {
        component: OathswornStep,
        type: StepType.CORE_TALENT
    },
    [Step.HUNTERS_MARK]: {
        component: HuntersMarkStep,
        type: StepType.CORE_TALENT
    },
    [Step.EXPERTISE]: {
        component: ExpertiseStep,
        type: StepType.CORE_TALENT
    },
    [Step.SORCERY]: {
        component: SorceryStep,
        type: StepType.CORE_TALENT
    },
    [Step.PACT]: {
        component: PactStep,
        type: StepType.CORE_TALENT
    },
    [Step.SPELLCRAFT]: {
        component: SpellcraftStep,
        type: StepType.CORE_TALENT
    },

    // Talents
    [Step.BARDIC_LORE]: {
        component: BardicLoreStep,
        type: StepType.TALENT
    },
    [Step.WARSONGS]: {
        component: WarsongsStep,
        type: StepType.TALENT
    },
    [Step.HERBALISM]: {
        component: HerbalismStep,
        type: StepType.TALENT
    },
    [Step.PRIMORDIAL_FORCES]: {
        component: PrimordialForcesStep,
        type: StepType.TALENT
    },
    [Step.ANIMAL_COMPANION]: {
        component: AnimalCompanionStep,
        type: StepType.TALENT
    }
    // [Step.PRIMORDIAL_BONDS]: {
    //     // TODO: Implement PrimordialBondsStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.TRUE_SHAPE]: {
    //     // TODO: Implement TrueShapeStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.ARCANE_TRAINING]: {
    //     // TODO: Implement ArcaneTrainingStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.DIVINE_BLESSING]: {
    //     // TODO: Implement DivineBlessingStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.TROPHIES]: {
    //     // TODO: Implement TrophiesStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.ELDRITCH_AFFINITY]: {
    //     // TODO: Implement EldritchAffinityStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.ELDRITCH_GROWTH]: {
    //     // TODO: Implement EldritchGrowthStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.WISPS]: {
    //     // TODO: Implement WispsStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.OTHERWORLDLY_FORM]: {
    //     // TODO: Implement OtherworldlyFormStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.ALCHEMIST]: {
    //     // TODO: Implement AlchemistStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.ARCANE_SPECIALITY]: {
    //     // TODO: Implement ArcaneSpecialityStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.FAMILIAR]: {
    //     // TODO: Implement FamiliarStep
    //     component: undefined,
    //     type: StepType.TALENT
    // },
    // [Step.MASTERED_THEOREM]: {
    //     // TODO: Implement MasteredTheoremStep
    //     component: undefined,
    //     type: StepType.TALENT
    // }
};
