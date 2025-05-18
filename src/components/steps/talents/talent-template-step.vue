<template>
    <StepFrame>
        <ReferenceCard :page="talent.page">lorem ipsum dolor sit amet, consectetur adipiscing elit.</ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.BARDIC_LORE)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

@media (max-width: 768px) {
}
</style>
