<template>
    <StepFrame>
        <ReferenceCard :page="64">
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
            <div class="martial-arts-style-inputs">
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
            </div>
            <div class="martial-arts-style-crucibles">
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

.martial-arts-style-inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    > * {
        width: 100%;
    }
}

.martial-arts-style-crucibles {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > * {
        width: 100%;
    }
}
</style>
