<template>
    <StepFrame>
        <ReferenceCard :page="64" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Discipline.title`) }}</h3>
                <p v-html="t(`Step.Discipline.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Discipline.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="martial-arts-style">
            <p v-html="t(`Step.Discipline.Martial-arts-style.instructions`)"></p>
            <div class="inputs-and-crucibles">
                <InputGroup
                    :placeholder="t('Step.Discipline.Martial-arts-style.Concepts.placeholder')"
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsStyle.concepts"
                >
                    {{ t('Step.Discipline.Martial-arts-style.Concepts.label') }}
                </InputGroup>
                <InputGroup
                    :placeholder="t('Step.Discipline.Martial-arts-style.Stances.placeholder')"
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsStyle.stances"
                >
                    {{ t('Step.Discipline.Martial-arts-style.Stances.label') }}
                </InputGroup>
                <InputGroup
                    :placeholder="t('Step.Discipline.Martial-arts-style.Weapons.placeholder')"
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsStyle.weapons"
                >
                    {{ t('Step.Discipline.Martial-arts-style.Weapons.label') }}
                </InputGroup>
                <CrucibleCard
                    :title="t('Step.Discipline.Martial-arts-style.Concepts.title')"
                    :items="
                        martialArtsStyleData.concepts.map((value) =>
                            t(`Step.Discipline.Martial-arts-style.Concepts.Crucible.${value}`)
                        )
                    "
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsCrucibles.concepts"
                />
                <CrucibleCard
                    :title="t('Step.Discipline.Martial-arts-style.Stances.title')"
                    :items="
                        martialArtsStyleData.stances.map((value) =>
                            t(`Step.Discipline.Martial-arts-style.Stances.Crucible.${value}`)
                        )
                    "
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsCrucibles.stances"
                />
                <CrucibleCard
                    :title="t('Step.Discipline.Martial-arts-style.Weapons.title')"
                    :items="
                        martialArtsStyleData.weapons.map((value) =>
                            t(`Step.Discipline.Martial-arts-style.Weapons.Crucible.${value}`)
                        )
                    "
                    v-model="adventurer.talentsData[Step.DISCIPLINE].martialArtsCrucibles.weapons"
                />
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import martialArtsStyleData from '@/assets/data/martial-arts-style.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import StepFrame from '../StepFrame.vue';
import CrucibleCard from '../ui/CrucibleCard.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

.inputs-and-crucibles {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    > .input-group {
        // Span whole grid
        grid-column: 1 / -1;
    }

    gap: 1rem;
    > * {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .inputs-and-crucibles {
        grid-template-columns: repeat(1, 1fr);
        > * {
            width: 100%;
            &:nth-child(1) {
                // Concepts input
                order: 1;
            }
            &:nth-child(4) {
                // Concepts crucible
                order: 2;
            }
            &:nth-child(2) {
                // Stances input
                order: 3;
            }
            &:nth-child(5) {
                // Stances crucible
                order: 4;
            }
            &:nth-child(3) {
                // Weapons input
                order: 5;
            }
            &:nth-child(6) {
                // Weapons crucible
                order: 6;
            }
        }
    }
}
</style>
