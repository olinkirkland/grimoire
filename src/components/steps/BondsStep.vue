<template>
    <StepFrame>
        <ReferenceCard :page="14">
            <p v-html="t('Step.Bonds.instructions')"></p>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import StepFrame from '@/components/StepFrame.vue';
import ReferenceCard from '@/components/ui/ReferenceCard.vue';
import { t } from '@/i18n/locale';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss"></style>
