<template>
    <div class="step-frame">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.step-frame {
    max-width: 96rem;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    flex: 0 0 auto;
    overflow-y: auto;
    padding: 0.8rem;
    scrollbar-width: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
}
</style>
