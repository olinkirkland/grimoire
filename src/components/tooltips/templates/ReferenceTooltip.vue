<template>
    <TooltipFrame :target="target" :position="'bottom'">
        <template v-slot:content>
            <div class="reference">
                <p>{{ t('Reference.page', { page: page.toString() }) }}</p>
            </div>
        </template>
    </TooltipFrame>
</template>

<script setup lang="ts">
import { t } from '@/i18n/locale';
import { computed } from 'vue';
import TooltipFrame from '../TooltipFrame.vue';

const props = defineProps<{
    page: number;
    target: HTMLElement;
}>();

const target = computed(() => {
    // Use the event's target to set the tooltip's target
    return props.target;
});
</script>

<style scoped lang="scss">
.reference {
    display: flex;
    max-width: 24rem;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    
    * {
        font-size: 1.2rem;
    }
}
</style>
