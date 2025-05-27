<template>
    <StepFrame>
        <Card>
            <div class="talent-block">
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <Transition name="fade" mode="out-in">
                    <h3 v-if="adventurer.talentsData[Step.CUSTOM].name">
                        ◈ {{ adventurer.talentsData[Step.CUSTOM].name }}
                    </h3>
                </Transition>
                <InputGroup
                    v-model="adventurer.talentsData[Step.CUSTOM].name"
                    :placeholder="t('Step.Custom.Name.placeholder')"
                    class="input-talent-name"
                >
                    <span>{{ t('Step.Custom.Name.label') }}</span>
                </InputGroup>
                <TextAreaGroup
                    v-model="adventurer.talentsData[Step.CUSTOM].description"
                    :placeholder="t('Step.Custom.Description.placeholder')"
                >
                    <span>{{ t('Step.Custom.Description.label') }}</span>
                </TextAreaGroup>
                <TextAreaGroup
                    v-model="adventurer.talentsData[Step.CUSTOM].growth"
                    :placeholder="t('Step.Custom.Growth.placeholder')"
                >
                    <span>{{ t('Step.Custom.Growth.label') }}</span>
                </TextAreaGroup>
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import StepFrame from '@/components/StepFrame.vue';
import TextAreaGroup from '@/components/ui/TextAreaGroup.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.talent-block {
    width: 100%;
    display: flex;
    flex-direction: column;

    > .input-group:not(:last-child),
    .text-area-group:not(:last-child) {
        margin-bottom: 1rem;
    }

    > .input-group:first-of-type {
        margin-top: 1rem;
    }
}

h2 {
    font-style: italic;
    color: var(--surface-alt);
}

// Transitions
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
