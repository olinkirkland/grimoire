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
        <ul class="portrait-list">
            <li v-for="(portrait, index) in portraits" :key="index">
                <img
                    :src="`${BASE_URL}${portrait.url}`"
                    :alt="`${BASE_URL}${portrait.url}`"
                    :class="{ selected: adventurer.portraitId === portrait.id }"
                    @click="adventurer.portraitId = portrait.id"
                />
            </li>
        </ul>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import portraits from '@/assets/data/portraits.json';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
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
.portrait-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    li {
        cursor: pointer;
        img {
            width: 6.4rem;
            border-radius: 100%;
            opacity: 0.6;
        }
        img.selected {
            opacity: 1;
        }
    }
}
</style>
