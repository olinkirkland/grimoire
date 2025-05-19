<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Talents.heading') }}</h2>
                <h3>◆ {{ t(`Step.Primordial-bonds.title`) }}</h3>
                <p v-html="t(`Step.Primordial-bonds.description`)"></p>
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

const talent = talentDefinitionsData.find((talent) => talent.id === Step.PRIMORDIAL_BONDS)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

@media (max-width: 768px) {
}
</style>
