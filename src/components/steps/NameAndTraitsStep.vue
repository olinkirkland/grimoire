<template>
    <StepFrame>
        <div class="traits-and-desires">
            <Card class="traits">
                <p v-html="t('Step.Name-and-traits.Traits.instructions')"></p>
                <Card>
                    <ul class="pick-list">
                        <li v-for="(trait, index) in traitsData" :key="index" @click="onClickCycleTrait(trait)">
                            <i :class="getTraitSelectionClass(trait)"></i>
                            <span>{{ trait }}</span>
                        </li>
                    </ul>
                </Card>
            </Card>
            <Card class="desires">
                <p v-html="t('Step.Name-and-traits.Desires.instructions')"></p>
                <Card>
                    <ul class="pick-list">
                        <li v-for="(desire, index) in desiresData" :key="index" @click="onClickCycleDesire(desire)">
                            <i :class="getDesireSelectionClass(desire)"></i>
                            <span>{{ desire }}</span>
                        </li>
                    </ul>
                </Card>
            </Card>
        </div>
        <Card glass>
            <InputGroup v-model="adventurer.name" :placeholder="t('Step.Name-and-traits.Adventurer-name.placeholder')">
                <span>{{ t('Step.Name-and-traits.Adventurer-name.label') }}</span>
            </InputGroup>
            <InputGroup
                v-model="adventurer.playerName"
                :placeholder="t('Step.Name-and-traits.Player-name.placeholder')"
            >
                <span>{{ t('Step.Name-and-traits.Player-name.label') }}</span>
            </InputGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import desiresData from '@/assets/data/desires.json';
import traitsData from '@/assets/data/traits.json';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function getTraitSelectionClass(trait: string): string {
    if (props.adventurer.traits.includes(trait)) return 'fas fa-circle';
    return props.adventurer.notTraits.includes(trait) ? 'far fa-times-circle' : 'far fa-circle';
}

function onClickCycleTrait(trait: string) {
    const isInTraits = props.adventurer.traits.includes(trait);
    const isInNotTraits = props.adventurer.notTraits.includes(trait);

    // If it's not in traits or notTraits, add it to traits, and return
    if (!isInTraits && !isInNotTraits) {
        props.adventurer.traits.push(trait);
        return;
    }

    // If it's in traits, remove it from traits, add it to notTraits, and return
    if (isInTraits) {
        props.adventurer.traits = props.adventurer.traits.filter((t) => t !== trait);
        props.adventurer.notTraits.push(trait);
        return;
    }

    // If it's in notTraits, remove it from notTraits, and return
    if (isInNotTraits) {
        props.adventurer.notTraits = props.adventurer.notTraits.filter((t) => t !== trait);
        return;
    }
}

function getDesireSelectionClass(desire: string): string {
    if (props.adventurer.desires.includes(desire)) return 'fas fa-circle';
    return props.adventurer.notDesires.includes(desire) ? 'far fa-times-circle' : 'far fa-circle';
}

function onClickCycleDesire(desire: string) {
    const isInDesires = props.adventurer.desires.includes(desire);
    const isInNotDesires = props.adventurer.notDesires.includes(desire);

    // If it's not in desires or notDesires, add it to desires, and return
    if (!isInDesires && !isInNotDesires) {
        props.adventurer.desires.push(desire);
        return;
    }

    // If it's in desires, remove it from desires, add it to notDesires, and return
    if (isInDesires) {
        props.adventurer.desires = props.adventurer.desires.filter((d) => d !== desire);
        props.adventurer.notDesires.push(desire);
        return;
    }

    // If it's in notDesires, remove it from notDesires, and return
    if (isInNotDesires) {
        props.adventurer.notDesires = props.adventurer.notDesires.filter((d) => d !== desire);
        return;
    }
}
</script>

<style scoped lang="scss">
.traits-and-desires {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.card.traits,
.card.desires {
    flex: 1;
    .card {
        width: 100%;
        background-color: var(--overlay);
        padding: 0.4rem;
    }
}

ul.pick-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    > li {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-style: italic;

        > span {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

@media (max-width: 768px) {
    .traits-and-desires {
        flex-direction: column;
    }
}
</style>
