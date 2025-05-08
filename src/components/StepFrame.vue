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
    margin: 0 auto;
    height: 100%;
    flex: 0 0 auto;
    overflow-y: auto;
    padding: 0.8rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
</style>
