<template>
    <div v-if="adventurer" class="page">
        <nav>
            <ul class="steps-list" ref="stepsEl">
                <li
                    v-for="step in steps"
                    :class="{ active: step === currentStep }"
                    :key="step"
                    @click="changeStep(step)"
                >
                    <span>
                        {{ t(`Steps.${StepDefinitions[step].label}.name`) }}
                    </span>
                </li>
            </ul>
        </nav>

        <div class="step-container">
            <component
                :is="StepDefinitions[currentStep].component"
                :adventurer="adventurer"
                :step="currentStep"
                :key="currentStep"
            ></component>
        </div>

        <div class="controls">
            <Button @click="onClickDeleteAdventurer">
                <span>{{ t('Adventurer.delete-adventurer') }}</span>
            </Button>
            <Button @click="onClickGoHome">
                <i class="fas fa-door-open"></i>
                <span>{{ t('Adventurer.go-home') }}</span>
            </Button>
            <Button @click="changeStep(steps[steps.indexOf(currentStep) + 1])" :disabled="currentStep === Step.REVIEW">
                <span>{{ t('Adventurer.next-step') }}</span>
                <i class="fas fa-arrow-right"></i>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { Step, StepDefinitions } from '@/step';
import { useAdventurersStore } from '@/store/adventurers-store';
import { ref } from 'vue';
import Button from '../ui/Button.vue';

const steps = [
    Step.NAME,
    Step.BACKGROUNDS,
    Step.TRAITS,
    Step.DESIRES,
    Step.FEATURES,
    Step.PATH,
    Step.STATS,
    Step.ARCS,
    Step.BONDS,
    Step.REVIEW
];

const adventurersStore = useAdventurersStore();

// Get the adventurer ID from the route params
const adventurerId = ref<string | null>(null);
adventurerId.value = router.currentRoute.value.params.id as string;
const adventurer = ref<Adventurer | null>(adventurersStore.getAdventurer(adventurerId.value) || null);

if (!adventurer.value) {
    // Redirect to the home page if the adventurer is not found
    router.push({ name: PageName.LOST });
}

const stepsEl = ref<HTMLElement | null>(null);
const stepId = ref<Step | null>(null);
const currentStep = ref(Step.NAME);

function changeStep(newStep: Step) {
    // TODO: Add logic to change the step
    console.log(`Changing step to: ${newStep}`);
    currentStep.value = newStep;
}

function onClickDeleteAdventurer() {
    if (!adventurer.value) return;
    adventurersStore.removeAdventurer(adventurer.value.id);
    router.push({ name: PageName.HOME });
}

function onClickGoHome() {
    // Redirect to the home page
    router.push({ name: PageName.HOME });
}
</script>

<style scoped lang="scss">
nav {
    width: 100%;
    background-color: var(--background);
    box-shadow: var(--shadow-sm);
}

ul.steps-list {
    display: flex;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    overflow-x: auto;

    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;

    > li {
        position: relative;
        padding: 0.8rem 1.6rem;
        cursor: pointer;
        span {
            font-size: 1.6rem;
            white-space: nowrap;
        }

        &::before {
            // border on bottom
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 0rem;
            background-color: var(--primary);
            transition: height 0.2s ease-in-out;
        }

        &.active {
            span {
                position: relative;
                color: var(--background);
                z-index: 1;
            }
            &::before {
                height: 100%;
            }
        }
    }
}

.step-container {
    flex-grow: 1;
    padding: 0 1.2rem;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1.2rem;
}
</style>
