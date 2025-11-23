<template>
    <StepFrame>
        <ReferenceCard :page="148" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Awakened-mind.title`) }}</h3>
                <p v-html="t(`Step.Awakened-mind.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong>
                        : {{ t('Step.Awakened-mind.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { defineProps } from 'vue';
const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>
