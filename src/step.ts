import ArcsStep from './components/steps/ArcsStep.vue';
import BondsStep from './components/steps/BondsStep.vue';
import DesiresStep from './components/steps/DesiresStep.vue';
import FeaturesStep from './components/steps/FeaturesStep.vue';
import HeritageStep from './components/steps/HeritageStep.vue';
import NameStep from './components/steps/NameStep.vue';
import PathStep from './components/steps/PathStep.vue';
import ProfessionStep from './components/steps/ProfessionStep.vue';
import ReviewStep from './components/steps/ReviewStep.vue';
import StatsStep from './components/steps/StatsStep.vue';
import TraitsStep from './components/steps/TraitsStep.vue';

export enum Step {
    NAME = 'name',
    HERITAGE = 'heritage',
    PROFESSION = 'profession',
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
    [Step.HERITAGE]: {
        label: 'Heritage',
        component: HeritageStep
    },
    [Step.PROFESSION]: {
        label: 'Profession',
        component: ProfessionStep
    },
    [Step.TRAITS]: {
        label: 'Traits',
        component: TraitsStep
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
