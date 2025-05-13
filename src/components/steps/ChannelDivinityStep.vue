<template>
    <StepFrame>
        <ReferenceCard :page="58">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Channel-divinity.title`) }}</h3>
                <p v-html="t(`Step.Channel-divinity.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Channel-divinity.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="create-god">
            <p v-html="t('Step.Channel-divinity.God-name.instructions')"></p>
            <InputGroup
                class="god-name-input"
                v-model="adventurer.talentsData['channel-divinity'].godName"
                :placeholder="t('Step.Channel-divinity.God-name.placeholder')"
            >
                <i class="fas fa-praying-hands"></i>
                <span> {{ t('Step.Channel-divinity.God-name.label') }} </span>
            </InputGroup>
            <p v-html="t('Step.Channel-divinity.Domains.instructions')"></p>
            <div class="domains-list">
                <DomainCard
                    v-for="(domain, index) in adventurer.talentsData['channel-divinity'].domains"
                    :primary="index === 0"
                    :key="index"
                    :domain="domain"
                ></DomainCard>
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import DomainCard from '../ui/DomainCard.vue';
import InputGroup from '../ui/InputGroup.vue';
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

.god-name-input {
    width: 100%;
    max-width: 100%;
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

.domain-block {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
}

.domains-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>
