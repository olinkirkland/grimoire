<template>
    <Card @click="onClickEditAdventurer">
        <h3 class="name" :class="{ 'name--long': adventurer.name.length > 8 }">{{ adventurer.name }}</h3>
    </Card>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import Card from '@/components/ui/Card.vue';
import { PageName, router } from '@/router';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickEditAdventurer() {
    // Redirect to the adventurer page with the adventurer ID
    router.push({
        name: PageName.ADVENTURER,
        params: { id: props.adventurer.id }
    });
}
</script>

<style scoped lang="scss">
.card {
    position: relative;
    background-color: var(--primary);
    border: 1px solid var(--primary-alt);
    width: 16rem;
    min-width: 16rem;
    height: 20rem;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        top: -1rem;
        transform: rotate(1deg);
        box-shadow: var(--shadow-md);
    }

    h3.name {
        text-align: center;
        font-family: var(--display);
        font-size: 3.2rem;
        line-height: 1;
        max-height: 100%;
        text-overflow: ellipsis;
        color: var(--surface);
        margin: 0;
        text-shadow: 0.1rem 0.1rem 0 black;

        &--long {
            font-size: 2rem;
        }
    }
}

@media (max-width: 768px) {
    .card:hover {
        top: 0;
        transform: rotate(0deg);
        box-shadow: none;
    }
}
</style>
