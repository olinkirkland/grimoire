<template>
    <div class="button-bar">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

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
</style>
