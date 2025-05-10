<template>
    <StepFrame>
        <ReferenceCard :page="54">
            <p v-html="t('Step.Path.instructions')"></p>
        </ReferenceCard>
        <Card>
            <ul>
                
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.card.paths {
    ul {
        display: flex;
    }
}
</style>
