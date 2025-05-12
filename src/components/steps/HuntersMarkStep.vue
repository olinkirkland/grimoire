<template>
    <StepFrame>
        <ReferenceCard :page="68">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Hunters-mark.title`) }}</h3>
                <p v-html="t(`Step.Hunters-mark.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Hunters-mark.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="favorite-traps">
            <div>TODO: FAVORITE TRAPS INPUTS & TABLE</div>
        </Card>
        <Card class="signs-of-weakness">
            <div>TODO: TELLTALE SIGNS OF WEAKNESS EXAMPLES</div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}
</style>
