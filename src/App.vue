<template>
    <div class="app-layout">
        <router-view name="page" v-slot="{ Component, route }">
            <div class="pattern"></div>
            <Transition name="page-transition" mode="out-in">
                <component :is="Component" />
            </Transition>
        </router-view>
        <the-modal-container />
        <the-tooltip-container />
    </div>
</template>

<script setup lang="ts">
import TheModalContainer from '@/components/modals/TheModalContainer.vue';
import TheTooltipContainer from '@/components/tooltips/TheTooltipContainer.vue';
import { initializeI18nInstance } from './i18n/locale';

initializeI18nInstance();
</script>

<style lang="scss">
@use '@/assets/scss/reset.scss';
@use '@/assets/scss/variables.scss';
@use '@/assets/scss/styles.scss';

.app-layout {
    height: 100vh; // Works everywhere, but buggy on mobile Safari (includes address bar)
    height: 100dvh; // Modern fix, uses the dynamic viewport height. Works properly with iOS Safari and all modern browsers
    min-height: -webkit-fill-available; // Fallback for iOS Safari

    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: var(--surface);
}

.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.pattern {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/floral.png');
    background-size: 20rem;
    opacity: 0.05;
}

// Transition
.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 0.2s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
    opacity: 0;
    transform: translateX(2rem);
}

.page-transition-leave-active {
    position: absolute;
}
</style>
