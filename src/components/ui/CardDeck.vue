<template>
    <ul class="carousel" ref="carousel" :class="{ 'flow-mode': isFlowMode }" @scroll="updateCurrentIndex">
        <li
            v-for="(child, index) in slotChildren"
            :key="index"
            :class="{
                'is-active': index === currentIndex,
                'left-of-active': (index as number) < currentIndex,
                'right-of-active': (index as number) > currentIndex
            }"
        >
            <component :is="child" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue';

const FLOW_MODE_THRESHOLD = 768; // px
const currentWidth = ref(0);
const isFlowMode = computed(() => {
    return currentWidth.value < FLOW_MODE_THRESHOLD;
});

const carousel = ref<HTMLElement | null>(null);
const slots = useSlots();
const slotChildren = computed(() => {
    const children = slots.default?.()[0].children || [];
    return children;
});

const currentIndex = ref(0);

// Listen for a change in width of this element
onMounted(() => {
    handleResize();
    updateCurrentIndex();
    window.addEventListener('resize', handleResize);
});

// Cleanup the event listener when the component is unmounted
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

function updateCurrentIndex() {
    if (!carousel.value) return 0;
    const carouselEl = carousel.value! as HTMLElement;
    // Find the index of the card at the center of the carousel
    // Cards can be different widths, so we need to calculate the center based on the scroll position
    const cards = carouselEl.querySelectorAll('li');
    console.log('calculating current index');
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const start = card.getBoundingClientRect().x - carouselEl.getBoundingClientRect().x;
        const end = start + card.clientWidth;
        if (end > carouselEl.clientWidth) continue;
        if (start < 0) continue;
        const distance = Math.abs(start - carouselEl.clientWidth / 2);
        if (distance < closestDistance) {
            closestDistance = distance;
            currentIndex.value = i;
        }
    }
}

function handleResize() {
    currentWidth.value = window.innerWidth;
    updateCurrentIndex();
}
</script>

<style scoped lang="scss">
ul.carousel {
    max-width: 100%;
    padding: 2rem;
    overflow-x: auto;
    display: flex;
    gap: 1rem;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    align-items: center;

    > * {
        scroll-snap-align: center;
    }
}

.is-active {
    transition: all 0.3s ease-in-out;
    transform: scale(1.1) rotate(0deg);
    z-index: 1;
}

.left-of-active {
    opacity: 0.5;
    transform: rotate(-2deg);
}

.right-of-active {
    opacity: 0.5;
    transform: rotate(2deg);
}

@media (min-width: 768px) {
    ul.carousel > li {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}
</style>
