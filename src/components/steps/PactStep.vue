<template>
    <StepFrame>
        <ReferenceCard :page="74" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Pact.title`) }}</h3>
                <p v-html="t(`Step.Pact.description`)"></p>
                <div class="gifts-obligations">
                    <Card class="gifts">
                        <p v-html="t('Step.Pact.gifts')"></p>
                    </Card>
                    <Card class="obligations">
                        <p v-html="t('Step.Pact.obligations')"></p>
                    </Card>
                </div>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Pact.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="patron-creation">
            <div>TODO: PATRON CREATION</div>
            <div>TODO: PATRON CRUCIBLE</div>
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

.gifts-obligations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .gifts-obligations {
        grid-template-columns: 1fr;
    }
}
</style>
