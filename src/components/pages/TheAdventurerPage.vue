<template>
    <div v-if="adventurer" class="page">
        <nav>
            <ul class="steps-list" ref="stepsEl">
                <li
                    v-for="step in stepsOrder"
                    :data-step-id="step"
                    :class="{ active: step === currentStep }"
                    :key="step"
                    @click="changeStep(step)"
                >
                    <span>
                        {{ t(`Step.${StepDefinitions[step].label}.title`) }}
                    </span>
                </li>
            </ul>
        </nav>

        <div class="step-container">
            <Transition :name="`step-transition--${direction}`" mode="out-in">
                <component
                    :is="StepDefinitions[currentStep].component"
                    :adventurer="adventurer"
                    :key="currentStep"
                ></component>
            </Transition>
        </div>

        <div class="controls">
            <Button @click="onClickGoHome">
                <i class="fas fa-door-open"></i>
            </Button>
            <Button @click="onClickSettings">
                <i class="fas fa-cog"></i>
            </Button>
            <Button
                @click="changeStep(stepsOrder[stepsOrder.indexOf(currentStep) + 1])"
                :disabled="currentStep === Step.REVIEW"
                primary
            >
                <span>{{ t('Adventurer.next-step') }}</span>
                <i class="fas fa-arrow-right"></i>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { Step, StepDefinitions } from '@/step';
import { useAdventurersStore } from '@/store/adventurers-store';
import { ref } from 'vue';
import AdventurerSettingsModal from '../modals/templates/AdventurerSettingsModal.vue';
import Button from '../ui/Button.vue';

const stepsOrder = [
    Step.HERITAGE,
    Step.BACKGROUND,
    Step.PERSONALITY,
    Step.PATH,
    Step.TALENTS,
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
const stepsEl = ref<HTMLElement | null>(null);
const direction = ref<'left' | 'right'>('left');

// Redirect to the first step if no step is provided in the route
const currentStep = ref<Step>(router.currentRoute.value.params.step as Step);
if (router.currentRoute.value.params.step === undefined) changeStep(stepsOrder[0]);

if (!adventurer.value) {
    // Redirect to the home page if the adventurer is not found
    router.push({ name: PageName.LOST });
}

function changeStep(newStep: Step) {
    const currentStepIndex = stepsOrder.indexOf(currentStep.value);
    const newStepIndex = stepsOrder.indexOf(newStep);
    direction.value = newStepIndex > currentStepIndex ? 'right' : 'left';
    currentStep.value = newStep;
    router.replace({
        name: PageName.ADVENTURER_STEP,
        params: { id: adventurerId.value, step: newStep }
    });

    scrollNavToStep(newStep);
}

function scrollNavToStep(newStep: string) {
    // Scroll ul.steps into view (x-scrollable on mobile)
    if (!stepsEl.value) return;
    const stepEl = stepsEl.value.querySelector(`[data-step-id="${newStep}"]`);
    if (!stepEl) return;

    const containerRect = stepsEl.value.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();

    // Calculate the scroll offset needed to bring `stepEl` into view
    const newX =
        stepsEl.value.scrollLeft + stepRect.left - containerRect.left + (stepRect.width - containerRect.width) / 2;

    stepsEl.value.scroll({
        left: newX,
        behavior: 'smooth'
    });
}

function onClickSettings() {
    if (!adventurer.value) return;
    ModalController.open(AdventurerSettingsModal, {
        adventurer: adventurer.value
    });
}

function onClickGoHome() {
    // Redirect to the home page
    router.push({ name: PageName.HOME });
}
</script>

<style scoped lang="scss">
.page {
    gap: 0;
}

nav {
    width: 100%;
    background-color: var(--background);
    box-shadow: var(--shadow-sm);
    z-index: 1;
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
                color: var(--primary);
            }
            &::before {
                height: 0.4rem;
            }
        }
    }
}

.step-container {
    flex-grow: 1;
    overflow: hidden;
    width: 100%;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.8rem;
}

// Transition
.step-transition-enter-from,
.step-transition-leave-to {
    opacity: 0;
    transform: translateX(2rem);
}

.step-transition--right-enter-active,
.step-transition--right-leave-active,
.step-transition--left-enter-active,
.step-transition--left-leave-active {
    transition: all 0.2s ease;
}

.step-transition--right-enter-from {
    opacity: 0;
    transform: translateX(4rem); // Enter from the right
}

.step-transition--right-leave-to {
    opacity: 0;
    transform: translateX(-4rem); // Leave to the left
}

.step-transition--left-enter-from {
    opacity: 0;
    transform: translateX(-4rem); // Enter from the left
}

.step-transition--left-leave-to {
    opacity: 0;
    transform: translateX(4rem); // Leave to the right
}
</style>
