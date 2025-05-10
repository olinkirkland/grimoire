<template>
    <Card class="card--reference">
        <slot></slot>
        <ReferenceTip :page="page" />
    </Card>
</template>

<script setup lang="ts">
import ReferenceTip from '../ReferenceTip.vue';
import Card from './Card.vue';

const props = defineProps({
    page: {
        type: Number,
        default: 0
    }
});
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    flex-direction: row;
    gap: 1.2rem;
    justify-content: space-between;
}

// iPad
@media (max-width: 768px) {
    .card {
        flex-direction: column;
    }
}
</style>
