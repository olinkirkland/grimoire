import ArcsStep from './components/steps/ArcsStep.vue';
import BackgroundStep from './components/steps/BackgroundStep.vue';
import BondsStep from './components/steps/BondsStep.vue';
import HeritageStep from './components/steps/HeritageStep.vue';
import PathStep from './components/steps/PathStep.vue';
import PersonalityStep from './components/steps/PersonalityStep.vue';
import ReviewStep from './components/steps/ReviewStep.vue';
import StatsStep from './components/steps/StatsStep.vue';

export enum Step {
    PERSONALITY = 'personality',
    HERITAGE = 'heritage',
    BACKGROUND = 'background',
    PATH = 'path',
    STATS = 'stats',
    ARCS = 'arcs',
    BONDS = 'bonds',
    REVIEW = 'review'
}

export const StepDefinitions: Record<Step, { label: string; component: any }> = {
    [Step.PERSONALITY]: {
        label: 'Personality',
        component: PersonalityStep
    },
    [Step.HERITAGE]: {
        label: 'Heritage',
        component: HeritageStep
    },
    [Step.BACKGROUND]: {
        label: 'Background',
        component: BackgroundStep
    },
    [Step.PATH]: {
        label: 'Path',
        component: PathStep
    },
    [Step.STATS]: {
        label: 'Stats',
        component: StatsStep
    },
    [Step.ARCS]: {
        label: 'Arcs',
        component: ArcsStep
    },
    [Step.BONDS]: {
        label: 'Bonds',
        component: BondsStep
    },
    [Step.REVIEW]: {
        label: 'Review',
        component: ReviewStep
    }
};
