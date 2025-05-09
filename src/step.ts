import ArcsStep from './components/steps/ArcsStep.vue';
import BackgroundStep from './components/steps/BackgroundStep.vue';
import BondsStep from './components/steps/BondsStep.vue';
import DesiresStep from './components/steps/DesiresStep.vue';
import FeaturesStep from './components/steps/FeaturesStep.vue';
import HeritageStep from './components/steps/HeritageStep.vue';
import NameAndTraitsStep from './components/steps/NameAndTraitsStep.vue';
import PathStep from './components/steps/PathStep.vue';
import ReviewStep from './components/steps/ReviewStep.vue';
import StatsStep from './components/steps/StatsStep.vue';

export enum Step {
    NAME_AND_TRAITS = 'name',
    HERITAGE = 'heritage',
    BACKGROUND = 'background',
    DESIRES = 'desires',
    FEATURES = 'features',
    PATH = 'path',
    STATS = 'stats',
    ARCS = 'arcs',
    BONDS = 'bonds',
    REVIEW = 'review'
}

export const StepDefinitions: Record<Step, { label: string; component: any }> = {
    [Step.NAME_AND_TRAITS]: {
        label: 'Name-and-traits',
        component: NameAndTraitsStep
    },
    [Step.HERITAGE]: {
        label: 'Heritage',
        component: HeritageStep
    },
    [Step.BACKGROUND]: {
        label: 'Background',
        component: BackgroundStep
    },
    [Step.DESIRES]: {
        label: 'Desires',
        component: DesiresStep
    },
    [Step.FEATURES]: {
        label: 'Features',
        component: FeaturesStep
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
