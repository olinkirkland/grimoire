<template>
    <Card class="card--reference" :class="{ 'floating-reference-tip': props.floatingReferenceTip }">
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
    },
    floatingReferenceTip: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    width: 100%;
    flex-direction: row;
    gap: 1.2rem;
    justify-content: space-between;
}

.floating-reference-tip > .reference-tip {
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
}

// iPad
@media (max-width: 768px) {
    .card {
        flex-direction: column;

        .reference-tip {
            position: static;
            padding: unset;
        }
    }
}
</style>
