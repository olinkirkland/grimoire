<template>
    <div class="badge">
        <div class="background"></div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.8rem;
    position: relative;

    > :not(.background) {
        white-space: nowrap;
        font-size: 1.4rem;
        z-index: 1;
    }

    .background {
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0.1;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--primary);
        border-radius: 5px;
    }
}
</style>
