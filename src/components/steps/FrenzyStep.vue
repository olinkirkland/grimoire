<template>
    <div>FRENZY</div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss"></style>
