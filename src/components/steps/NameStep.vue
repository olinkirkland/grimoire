<template>NAME STEP</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    },
    step: {
        type: String,
        required: true
    }
});
</script>

<style scoped lang="scss"></style>
