<template>
    <Card :class="{ selected: props.selected }" shadow>
        <slot></slot>
    </Card>
</template>

<script setup lang="ts">
const props = defineProps({
    selected: Boolean
});
</script>

<style scoped lang="scss">
.card {
    cursor: pointer;
    align-items: center;
    gap: 0;
    transition: box-shadow 0.2s ease-in-out;
    padding: 1rem;

    :deep(em) {
        font-size: 1.2rem;
        color: var(--surface-alt);
        white-space: nowrap;
    }

    &.selected {
        transition: none;
        box-shadow: none;
        background-color: var(--primary-light);
        color: var(--primary-alt);
        > em {
            color: var(--primary);
            opacity: 0.6;
        }
    }
}
</style>
