import BackgroundsStep from './components/steps/BackgroundsStep.vue';
import NameStep from './components/steps/NameStep.vue';

export enum Step {
    NAME = 'name',
    BACKGROUNDS = 'backgrounds',
    TRAITS = 'traits',
    DESIRES = 'desires',
    FEATURES = 'features',
    PATH = 'path',
    STATS = 'stats',
    ARCS = 'arcs',
    BONDS = 'bonds',
    REVIEW = 'review'
}

export const StepDefinitions: Record<Step, { label: string; component: any }> = {
    [Step.NAME]: {
        label: 'Name',
        component: NameStep
    },
    [Step.BACKGROUNDS]: {
        label: 'Backgrounds',
        component: BackgroundsStep
    },
    [Step.TRAITS]: {
        label: 'Traits',
        component: undefined
    },
    [Step.DESIRES]: {
        label: 'Desires',
        component: undefined
    },
    [Step.FEATURES]: {
        label: 'Features',
        component: undefined
    },
    [Step.PATH]: {
        label: 'Path',
        component: undefined
    },
    [Step.STATS]: {
        label: 'Stats',
        component: undefined
    },
    [Step.ARCS]: {
        label: 'Arcs',
        component: undefined
    },
    [Step.BONDS]: {
        label: 'Bonds',
        component: undefined
    },
    [Step.REVIEW]: {
        label: 'Review',
        component: undefined
    }
};
