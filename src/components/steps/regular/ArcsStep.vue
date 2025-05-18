<template>
    <StepFrame>
        <ReferenceCard :page="15">
            <p v-html="t('Step.Arcs.instructions')"></p>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss"></style>
