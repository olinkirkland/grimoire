<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Talents.heading') }}</h2>
                <h3>◈ {{ t(`Step.Animal-companion.title`) }}</h3>
                <p v-html="t(`Step.Animal-companion.description`)"></p>
            </div>
        </ReferenceCard>
        <Card>
            <p
                v-html="
                    t('Step.Animal-companion.Tricks.instructions', {
                        count: adventurer.talentsData[Step.ANIMAL_COMPANION].takenAgain ? '6' : '3'
                    })
                "
            ></p>
            <ul class="trait">
                <Card
                    v-for="(tricks, index) in animalCompanionData.tricks"
                    @click="onToggleTrait(tricks, 'tricks')"
                    :key="index"
                    :class="{ selected: isTraitSelected(tricks, 'tricks') }"
                >
                    <span>{{ t(`Step.Animal-companion.Tricks.${tricks}`) }}</span>
                    <em>{{ t(`Step.Animal-companion.tricks`) }}</em>
                </Card>
            </ul>
            <p v-html="t('Step.Animal-companion.Flaws.instructions')"></p>
            <ul class="trait">
                <Card
                    v-for="(flaw, index) in animalCompanionData.flaws"
                    @click="onToggleTrait(flaw, 'flaws')"
                    :key="index"
                    :class="{ selected: isTraitSelected(flaw, 'flaws') }"
                >
                    <span>{{ t(`Step.Animal-companion.Flaws.${flaw}`) }}</span>
                    <em>{{ t(`Step.Animal-companion.flaws`) }}</em>
                </Card>
            </ul>
        </Card>
        <Card>
            <p v-html="t('Step.Animal-companion.Special.instructions')"></p>
            <Button v-if="!adventurer.talentsData[Step.ANIMAL_COMPANION].takenAgain" @click="onClickTakeAgain" primary>
                <i class="fas fa-plus"></i>
                <span>{{ t('Step.Animal-companion.Special.button') }}</span>
            </Button>
            <Button v-else @click="onClickUndoTakeAgain">
                <i class="fas fa-undo"></i>
                <span>{{ t('Step.Animal-companion.Special.undo') }}</span>
            </Button>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import animalCompanionData from '@/assets/data/animal-companion.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.ANIMAL_COMPANION)!;

function onToggleTrait(trait: string, category: 'tricks' | 'flaws') {
    if (isTraitSelected(trait, category)) {
        deselectTrait(trait, category);
    } else {
        props.adventurer.talentsData[Step.ANIMAL_COMPANION][category].push(trait);
    }
}

function isTraitSelected(trait: string, category: 'tricks' | 'flaws') {
    return props.adventurer.talentsData[Step.ANIMAL_COMPANION][category].includes(trait);
}

function deselectTrait(trait: string, category: 'tricks' | 'flaws') {
    const index = props.adventurer.talentsData[Step.ANIMAL_COMPANION][category].indexOf(trait);
    if (index !== -1) props.adventurer.talentsData[Step.ANIMAL_COMPANION][category].splice(index, 1);
}

function onClickTakeAgain() {
    props.adventurer.talentsData[Step.ANIMAL_COMPANION].takenAgain = true;
}

function onClickUndoTakeAgain() {
    props.adventurer.talentsData[Step.ANIMAL_COMPANION].takenAgain = false;
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

ul.trait {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;

    .card {
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        align-items: center;
        gap: 0;
        transition: box-shadow 0.2s ease-in-out;
        padding: 1rem;

        > em {
            font-size: 1.2rem;
            color: var(--surface-alt);
        }

        &.selected {
            transition: none;
            box-shadow: none;
            background-color: var(--primary-light);
            color: var(--primary-alt);
            > em {
                color: var(--primary);
                opacity: 0.6;
            }
        }
    }
}

@media (max-width: 768px) {
    ul.trait {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
