<template>
    <div class="badge">
        <div class="background" :style="{ backgroundColor: color }"></div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
    color: {
        type: String,
        default: 'var(--primary)'
    }
});
</script>

<style scoped lang="scss">
.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.8rem;
    position: relative;

    > * {
        white-space: nowrap;
        font-size: 1.2rem;
    }

    .background {
        top: 0;
        left: 0;
        opacity: 0.2;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 99px;
    }
}
</style>
