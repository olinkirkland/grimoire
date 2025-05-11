import ArcsStep from './components/steps/ArcsStep.vue';
import BackgroundStep from './components/steps/BackgroundStep.vue';
import BardsongStep from './components/steps/BardsongStep.vue';
import BondsStep from './components/steps/BondsStep.vue';
import ChannelDivinityStep from './components/steps/ChannelDivinityStep.vue';
import DisciplineStep from './components/steps/DisciplineStep.vue';
import ExpertiseStep from './components/steps/ExpertiseStep.vue';
import FrenzyStep from './components/steps/FrenzyStep.vue';
import HeritageStep from './components/steps/HeritageStep.vue';
import HuntersMarkStep from './components/steps/HuntersMarkStep.vue';
import OathswornStep from './components/steps/OathswornStep.vue';
import PactStep from './components/steps/PactStep.vue';
import PathStep from './components/steps/PathStep.vue';
import PersonalityStep from './components/steps/PersonalityStep.vue';
import ReviewStep from './components/steps/ReviewStep.vue';
import SorceryStep from './components/steps/SorceryStep.vue';
import SpellcraftStep from './components/steps/SpellcraftStep.vue';
import StatsStep from './components/steps/StatsStep.vue';
import TalentsStep from './components/steps/TalentsStep.vue';
import WeaponMasteryStep from './components/steps/WeaponMasteryStep.vue';
import WildShapeStep from './components/steps/WildShapeStep.vue';

export enum Step {
    PERSONALITY = 'personality',
    HERITAGE = 'heritage',
    BACKGROUND = 'background',
    PATH = 'path',
    TALENTS = 'talents',
    STATS = 'stats',
    ARCS = 'arcs',
    BONDS = 'bonds',
    REVIEW = 'review',

    // Core Talents
    BARDSONG = 'bardsong',
    FRENZY = 'frenzy',
    CHANNEL_DIVINITY = 'channel-divinity',
    WILD_SHAPE = 'wild-shape',
    WEAPON_MASTERY = 'weapon-mastery',
    DISCIPLINE = 'discipline',
    OATHSWORN = 'oathsworn',
    HUNTERS_MARK = 'hunters-mark',
    EXPERTISE = 'expertise',
    SORCERY = 'sorcery',
    PACT = 'pact',
    SPELLCRAFT = 'spellcraft'
}

export enum StepType {
    MAIN = 'main',
    CORE_TALENT = 'core-talent',
    TALENT = 'talent'
}

export const StepDefinitions: Record<Step, { component: any; type: StepType }> = {
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
    }
};
