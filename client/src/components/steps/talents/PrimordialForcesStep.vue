<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>
                    {{
                        t(`Step.Talents.talent-by-path`, {
                            path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`)
                        })
                    }}
                </h2>
                <h3>⬦ {{ t(`Step.Primordial-forces.title`) }}</h3>
                <p v-html="t('Step.Primordial-forces.description')"></p>
                <ul class="forces-list">
                    <li v-for="force in ['air', 'earth', 'fire', 'water']" :key="force">
                        <ToggleCard
                            @click="onClickToggleForce(force)"
                            :selected="isForceSelected(force)"
                            :class="{ deactivated: adventurer.talentsData[Step.PRIMORDIAL_FORCES].takenAgain }"
                        >
                            <div class="force-image">
                                <div class="force-image__background"></div>
                                <div class="mask" :style="getMaskStyle('element')">
                                    <div
                                        :class="{ 'no-gradient': !isForceSelected(force) }"
                                        :style="getGradientStyle(force)"
                                    ></div>
                                </div>
                            </div>
                            <p>{{ t(`Step.Primordial-forces.${force}`) }}</p>
                        </ToggleCard>
                    </li>
                </ul>
            </div>
        </ReferenceCard>
        <Card>
            <p v-html="t('Step.Primordial-forces.Special.instructions')"></p>
            <Button v-if="!adventurer.talentsData[Step.PRIMORDIAL_FORCES].takenAgain" @click="onClickTakeAgain" primary>
                <i class="fas fa-plus"></i>
                <span>{{ t('Step.Primordial-forces.Special.button') }}</span>
            </Button>
            <Button v-else @click="onClickUndoTakeAgain">
                <i class="fas fa-undo"></i>
                <span>{{ t('Step.Primordial-forces.Special.undo') }}</span>
            </Button>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.PRIMORDIAL_FORCES)!;

function isForceSelected(force: string) {
    return !!props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].forces.find((f: string) => f === force);
}

function deselectForce(force: string) {
    props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].forces = props.adventurer.talentsData[
        Step.PRIMORDIAL_FORCES
    ].forces.filter((f: string) => f !== force);
}

function getMaskStyle(force: string) {
    return {
        '-webkit-mask-image': `url('${BASE_URL}assets/images/classic-elements/${force}.png')`,
        'mask-image': `url('${BASE_URL}assets/images/classic-elements/${force}.png')`
    };
}

function getGradientStyle(force: string) {
    const colorsByForce: Record<string, string[]> = {
        air: ['#87CEEB', '#c0e0fa'],
        earth: ['#8a391a', '#ab4118'],
        fire: ['#e03131', '#f59f00'],
        water: ['#4682B4', '#81b2db']
    };

    if (!colorsByForce[force]) return {};

    const [color1, color2] = colorsByForce[force];
    return { background: `linear-gradient(to top, ${color1}, ${color2})` };
}

function onClickToggleForce(force: string) {
    if (isForceSelected(force)) {
        deselectForce(force);
    } else {
        // Deselect all other forces
        for (const otherForce of ['air', 'earth', 'fire', 'water']) {
            if (otherForce !== force) deselectForce(otherForce);
        }

        props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].forces.push(force);
    }
}

function onClickTakeAgain() {
    props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].takenAgain = true;
    props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].forces = ['air', 'earth', 'fire', 'water'];
}

function onClickUndoTakeAgain() {
    props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].takenAgain = false;
    props.adventurer.talentsData[Step.PRIMORDIAL_FORCES].forces = [];
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card--reference > p {
    margin-bottom: 1rem;
}

ul.forces-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: var(--shadow-sm);
        cursor: pointer;

        &.selected {
            box-shadow: unset;
            background-color: var(--primary-light);
            color: var(--primary);
        }

        &.deactivated {
            cursor: unset;
            pointer-events: none;
        }
    }
}

.selected .force-image__background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    height: 4rem;
    background-color: var(--primary);
    border-radius: 50%;
    opacity: 0.3;
    filter: blur(0.7rem);
}

.force-image {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin-bottom: 1rem;

    > .mask {
        width: 100%;
        height: 100%;
        mask-repeat: no-repeat;
        mask-size: cover;

        > div {
            width: 100%;
            height: 100%;
            &.no-gradient {
                background: none !important;
                background-color: var(--surface-alt) !important;
            }
        }
    }
}

@media (max-width: 768px) {
    ul.forces-list {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
