<template>
    <Card class="tables-group" :class="{ 'tables-group--merge': merge }">
        <slot></slot>
    </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue';

const props = defineProps({
    merge: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.tables-group {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 0;

    :deep(.table-card) {
        flex: 1;
        border-radius: 0;
        border: none;
        &:not(:last-child) {
            border-right: 1px solid var(--surface-border);
        }
    }
}

@media (max-width: 768px) {
    .tables-group {
        flex-direction: column;
        :deep(.table-card) {
            &:not(:last-child) {
                border-right: none;
            }
        }
    }

    // If the tables are not merged, add a bottom border to each table
    // An example of merging would be a split table, where you have half the items on the left and half on the right
    // for layout purposes (see WildShapeStep.vue)
    .tables-group:not(.tables-group--merge) {
        :deep(.table-card) {
            &:not(:last-child) {
                border-bottom: 1px solid var(--surface-border);
            }
        }
    }
}
</style>
