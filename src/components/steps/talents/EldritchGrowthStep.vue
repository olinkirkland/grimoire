<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Talents.heading') }}</h2>
                <h3>◈ {{ t(`Step.Eldritch-growth.title`) }}</h3>
                <p v-html="t(`Step.Eldritch-growth.description`)"></p>
                <InputGroup
                    :placeholder="t(`Step.Eldritch-growth.placeholder`)"
                    v-model="adventurer.talentsData[Step.ELDRITCH_GROWTH].name"
                >
                    {{ t('Step.Eldritch-growth.label') }}
                </InputGroup>
            </div>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.ELDRITCH_GROWTH)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card--reference p {
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
}
</style>
