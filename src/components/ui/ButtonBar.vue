<template>
    <div class="button-bar" :class="{ 'full-width': fullWidth }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    fullWidth: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.button-bar {
    display: flex;

    :deep(button > .btn__content) {
        border-radius: 0;
    }

    :deep(button > .btn__shadow) {
        border-radius: 0;
    }

    :deep(button:first-child > .btn__content) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    :deep(button:first-child > .btn__shadow) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    :deep(button:last-child > .btn__content) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    :deep(button:last-child > .btn__shadow) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}

.button-bar.full-width {
    width: 100%;
    :deep(button) {
        flex: 1;
        > .btn__content {
            justify-content: center;
        }
    }
}
</style>
