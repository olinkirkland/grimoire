<template>
    <div
        class="card"
        :class="{
            'card--allow-overflow': overflow,
            'card--with-shadow': shadow,
            glass: glass
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
    },
    glass: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    max-width: 100%;
    padding: 2rem;
    border-radius: 5px;
    background-color: var(--background);
    border: 1px solid var(--surface-border);
    overflow-y: auto;
    overflow-x: hidden;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;

    &.glass {
        background: unset;
        border: none;
        box-shadow: var(--shadow-sm);
    }

    &--with-shadow {
        box-shadow: var(--shadow-sm);
    }

    &--allow-overflow {
        overflow: visible;
    }
}

:deep(h3) {
    margin-bottom: 0.4rem;
}
</style>
