<template>
    <StepFrame>
        <ReferenceCard :page="54" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Bardsong.title`) }}</h3>
                <p v-html="t(`Step.Bardsong.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Bardsong.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="song-composition">
            <p v-html="t('Step.Bardsong.instructions')"></p>
            <TableGroup>
                <TableCard :title="t('Step.Bardsong.Style.name')" :items="bardsongData.style">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bardsong.Style.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Bardsong.Tune.name')" :items="bardsongData.tune">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bardsong.Tune.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Bardsong.Impact.name')" :items="bardsongData.impact">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bardsong.Impact.${item}`) }}</span>
                    </template>
                </TableCard>
            </TableGroup>
            <p class="song-examples" v-html="t('Step.Bardsong.examples')"></p>
        </Card>
        <Card>
            <p v-html="t('Step.Bardsong.Bardic-instrument.instructions')"></p>
            <TableGroup>
                <TableCard
                    v-for="(category, categoryKey) in bardicInstrumentsData"
                    :key="categoryKey"
                    :title="t(`Step.Bardsong.Bardic-instrument.${categoryKey}`)"
                    :items="category"
                >
                    <template #item="{ item }">
                        <span
                            class="ellipsis text-center instrument-item"
                            @click="
                                adventurer.talentsData[Step.BARDSONG].bardicInstrument = t(
                                    `Step.Bardsong.Bardic-instrument.${item}`
                                )
                            "
                        >
                            {{ t(`Step.Bardsong.Bardic-instrument.${item}`) }}
                        </span>
                    </template>
                </TableCard>
            </TableGroup>
            <InputGroup
                v-model="adventurer.talentsData[Step.BARDSONG].bardicInstrument"
                class="bardic-instrument-input"
                :placeholder="t('Step.Bardsong.Bardic-instrument.placeholder')"
            >
                <i class="fas fa-music"></i>
                <span>{{ t('Step.Bardsong.Bardic-instrument.label') }}</span>
            </InputGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bardicInstrumentsData from '@/assets/data/bardic-instruments.json';
import bardsongData from '@/assets/data/bardsong.json';
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
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

.instrument-item {
    cursor: pointer;
}

@media (max-width: 768px) {
    :deep(.bardic-instrument-input span) {
        display: none;
    }
}
</style>
