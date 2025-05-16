<template>
    <Card class="tables-group">
        <slot></slot>
    </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue';
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
                border-bottom: 1px solid var(--surface-border);
            }
        }
    }
}
</style>
