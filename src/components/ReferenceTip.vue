<template>
    <div class="flex center">
        <i
            class="fas fa-book-open"
            @mouseover="
                TooltipController.open(ReferenceTooltip, {
                    target: $event.currentTarget,
                    page: props.page
                })
            "
        ></i>
        <p class="muted">{{ t('Reference.page', { page: props.page.toString() }) }}</p>
    </div>
</template>

<script setup lang="ts">
import TooltipController from '@/controllers/tooltip-controller';
import { t } from '@/i18n/locale';
import ReferenceTooltip from './tooltips/templates/ReferenceTooltip.vue';

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
});
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    font-size: 1.6rem;
    color: var(--color-primary);
    opacity: 0.2;
}

p {
    display: none;
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    i {
        pointer-events: none;
    }
    p {
        display: block;
    }
}
</style>
