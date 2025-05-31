<template>
    <StepFrame>
        <ReferenceCard :page="146" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Ingenuity.title`) }}</h3>
                <p v-html="t(`Step.Ingenuity.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong>
                        : {{ t('Step.Ingenuity.growth') }}
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
