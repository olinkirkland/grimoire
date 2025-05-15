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
            <div class="favorite-traps-inputs">
                <p v-html="t('Step.Hunters-mark.Traps.instructions')"></p>
                <InputGroup
                    v-model="adventurer.talentsData[Step.HUNTERS_MARK].traps[0]"
                    :placeholder="t('Step.Hunters-mark.Traps.placeholder-1')"
                >
                    {{ t('Step.Hunters-mark.Traps.label') }} #1
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.HUNTERS_MARK].traps[1]"
                    :placeholder="t('Step.Hunters-mark.Traps.placeholder-2')"
                >
                    {{ t('Step.Hunters-mark.Traps.label') }} #2
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.HUNTERS_MARK].traps[2]"
                    :placeholder="t('Step.Hunters-mark.Traps.placeholder-3')"
                >
                    {{ t('Step.Hunters-mark.Traps.label') }} #3
                </InputGroup>
            </div>
            <TrapsCard v-model="adventurer.talentsData[Step.HUNTERS_MARK].builder" />
        </Card>
        <Card class="signs-of-weakness">
            <p v-html="t('Step.Hunters-mark.Signs-of-weakness.instructions')"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import StepFrame from '../StepFrame.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import TrapsCard from '../ui/TrapsCard.vue';

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

.favorite-traps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.favorite-traps-inputs {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

@media (max-width: 768px) {
    .favorite-traps-inputs {
        grid-template-columns: 1fr;
    }
}
</style>
