<template>
    <StepFrame>
        <ReferenceCard :page="76">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Spellcraft.title`) }}</h3>
                <p v-html="t(`Step.Spellcraft.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Spellcraft.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="spell-crucible">
            <div>TODO: SPELL CRUCIBLE</div>
            <div>TODO: SPELL EXAMPLES</div>
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
</style>
