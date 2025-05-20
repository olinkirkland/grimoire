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
                <h3>⬥ {{ t(`Step.Mastered-theorem.title`) }}</h3>
                <p v-html="t(`Step.Talents.Mastered-theorem.description`)"></p>
            </div>
        </ReferenceCard>
        <Card glass class="added-theorems-card">
            <ul
                v-if="
                    adventurer.talentsData[Step.SPELLCRAFT]?.theorems.length ||
                    adventurer.talentsData[Step.ARCANE_TRAINING]?.theorems.length
                "
            >
                <Card
                    v-for="(theorem, index) in combinedTheoremsList"
                    class="added-theorem"
                    @click="onClickTheorem(index)"
                    :class="{ selected: adventurer.talentsData[Step.MASTERED_THEOREM].theorem === index }"
                >
                    <div>
                        <h3 class="ellipsis">{{ theorem.name }}</h3>
                        <p>{{ getMagicSchoolLabel(theorem.magicSchool) }}</p>
                    </div>
                </Card>
            </ul>
            <p v-else>
                <em>{{ t('Step.Mastered-theorem.empty') }}</em>
            </p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.MASTERED_THEOREM)!;

const combinedTheoremsList = computed(() => {
    const spellcraftTheorems = props.adventurer.talentsData[Step.SPELLCRAFT]?.theorems || [];
    const arcaneTrainingTheorems = props.adventurer.talentsData[Step.ARCANE_TRAINING]?.theorems || [];
    return [...spellcraftTheorems, ...arcaneTrainingTheorems];
});

function getMagicSchoolLabel(magicSchool: string) {
    const specialty = props.adventurer.talentsData[Step.ARCANE_SPECIALTY]?.magicSchool;
    if (!specialty || magicSchool === specialty) return `${magicSchool}`;
    return `${magicSchool}, ${specialty}`;
}

function onClickTheorem(index: number) {
    console.log('onClickTheorem', index);
    if (index === props.adventurer.talentsData[Step.MASTERED_THEOREM].theorem) {
        props.adventurer.talentsData[Step.MASTERED_THEOREM].theorem = -1;
    } else {
        props.adventurer.talentsData[Step.MASTERED_THEOREM].theorem = index;
    }
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.added-theorems-card ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > .card {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        gap: 1rem;
        box-shadow: var(--shadow-sm);
        cursor: pointer;

        > div {
            flex: 1;
            overflow: hidden;
            > h3 {
                font-size: 1.6rem;
            }
            > p {
                margin-top: -0.4rem;
                font-style: italic;
                color: var(--surface-alt);
                margin-bottom: 0;
            }
        }

        &.selected {
            transition: none;
            box-shadow: none;
            background-color: var(--primary-light);
            * {
                color: var(--primary-alt);
            }
            > em {
                color: var(--primary);
                opacity: 0.6;
            }
        }
    }
}

@media (max-width: 768px) {
    .added-theorems-card ul {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
