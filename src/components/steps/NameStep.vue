<template>
    <StepFrame>
        <Card glass>
            <InputGroup v-model="adventurer.name" :placeholder="t('Step.Name.Adventurer-name.placeholder')">
                <span>{{ t('Step.Name.Adventurer-name.label') }}</span>
            </InputGroup>
            <InputGroup v-model="adventurer.playerName" :placeholder="t('Step.Name.Player-name.placeholder')">
                <span>{{ t('Step.Name.Player-name.label') }}</span>
            </InputGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import InputGroup from '../ui/InputGroup.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.step-frame {
    justify-content: center;
}

@media (max-width: 768px) {
    .step-frame {
        justify-content: flex-start;
    }
}
</style>
