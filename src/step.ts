import ArcsStep from './components/steps/ArcsStep.vue';
import BackgroundStep from './components/steps/BackgroundStep.vue';
import BondsStep from './components/steps/BondsStep.vue';
import HeritageStep from './components/steps/HeritageStep.vue';
import PathStep from './components/steps/PathStep.vue';
import PersonalityStep from './components/steps/PersonalityStep.vue';
import ReviewStep from './components/steps/ReviewStep.vue';
import StatsStep from './components/steps/StatsStep.vue';
import TalentsStep from './components/steps/TalentsStep.vue';
import TalentStep from './components/steps/TalentStep.vue';

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
    TALENT = 'talent'
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
    [Step.TALENTS]: {
        label: 'Talents',
        component: TalentsStep
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
    },
    [Step.TALENT]: {
        label: 'Talent',
        component: TalentStep
    }
};
