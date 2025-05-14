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
            <p v-html="t('Step.Hunters-mark.Traps.instructions')"></p>
            <div class="favorite-traps-inputs">
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
            <div>TODO: FAVORITE TRAPS CARD</div>
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
import InputGroup from '../ui/InputGroup.vue';
import { Step } from '@/step';

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

.favorite-traps-inputs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>
