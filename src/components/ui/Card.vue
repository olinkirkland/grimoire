<template>
    <div
        class="card"
        :class="{
            'card--allow-overflow': overflow,
            'card--with-shadow': shadow
        }"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    overflow: {
        type: Boolean,
        default: false
    },
    shadow: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
.card {
    padding: 2rem;
    border-radius: 5px;
    background-color: var(--background);
    border: 1px solid var(--surface-border);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.8rem;

    &--allow-overflow {
        overflow: visible;
    }
}

:deep(h3) {
    margin-bottom: 0.4rem;
}
</style>
