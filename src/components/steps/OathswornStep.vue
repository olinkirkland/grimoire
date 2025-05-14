<template>
    <StepFrame>
        <ReferenceCard :page="66">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Oathsworn.title`) }}</h3>
                <p v-html="t(`Step.Oathsworn.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Oathsworn.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="swear-your-oath">
            <p v-html="t(`Step.Oathsworn.Oath.instructions`)"></p>
            <ul class="tenets-list">
                <li v-for="(tenet, index) in props.adventurer.talentsData.oathsworn.tenets" :key="index">
                    <InputGroup
                        v-model="props.adventurer.talentsData.oathsworn.tenets[index]"
                        :placeholder="t(`Step.Oathsworn.Oath.Tenet.placeholder-${index + 1}`)"
                    >
                        <span>{{ t(`Step.Oathsworn.Oath.Tenet.label`) }} #{{ index + 1 }}</span>
                    </InputGroup>
                </li>
            </ul>
            <TenetCard v-model="props.adventurer.talentsData.oathsworn.builder" />
        </Card>
        <Card class="oathbreaker">
            <p v-html="t(`Step.Oathsworn.oathbreaker`)"></p>
            <p v-html="t(`Step.Oathsworn.redemption`)"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import TenetCard from '../ui/TenetCard.vue';

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

.swear-your-oath {
    ul.tenets-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
}
</style>
