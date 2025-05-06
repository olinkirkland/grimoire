<template>
    <Card @click="onClickEditAdventurer">
        <div
            class="card__header"
            :style="{ backgroundImage: `url(${BASE_URL}${getPortraitUrl(adventurer.portraitId)})` }"
        >
            <h3 class="name">{{ adventurer.name }}</h3>
            <p class="modified-date">{{ modifiedDate }}</p>
        </div>
        <div class="card__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import Card from '@/components/ui/Card.vue';
import { BASE_URL, PageName, router } from '@/router';
import { getPortraitUrl } from '@/utils/adventurer-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const modifiedDate = computed(() => {
    const d = new Date(props.adventurer.updatedAt);
    // If the year is the current year, only show the month and day
    const currentYear = new Date().getFullYear();
    if (d.getFullYear() === currentYear) return d.getMonth() + 1 + '/' + d.getDate();
    return d.toLocaleDateString();
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
    top: 0;
    width: 16rem;
    min-width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        top: -1rem;
        transform: rotate(1deg);
        box-shadow: var(--shadow-sm);
    }

    .card__header {
        position: relative;
        width: 100%;
        padding: 2rem;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 9.6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        h3.name {
            text-align: center;
            font-family: var(--display);
            font-weight: normal;
            font-size: 2rem;
            line-height: 1;
            height: min-content;
            color: var(--surface);
            margin: 0;
            text-shadow: 0.1rem 0.1rem 0 black;
        }

        p {
            position: absolute;
            top: 0rem;
            right: 0rem;
            padding: 1rem;
            font-size: 1.2rem;
            color: var(--surface-alt);
        }
    }

    .card__body {
        padding: 2rem;
        padding-top: 0;
    }
}
</style>
