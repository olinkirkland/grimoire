<template>
    <StepFrame>
        <Card>
            <div>TODO: REVIEW</div>
        </Card>
        <Card>
            <div>TODO: EXPORT</div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import StepFrame from '../StepFrame.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss"></style>
