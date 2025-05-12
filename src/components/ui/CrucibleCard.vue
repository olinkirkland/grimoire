<template>
    <Card class="card">
        <slot></slot>
    </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue';
</script>

<style lang="scss" scoped>
.card {
    width: fit-content;
    flex-direction: row;
    gap: 1.2rem;
}
</style>
