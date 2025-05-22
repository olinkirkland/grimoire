<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>
                    {{
                        t(`Step.Talents.talent-by-path`, {
                            path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`)
                        })
                    }}
                </h2>
                <h3>⬦ {{ t(`Step.Bardic-lore.title`) }}</h3>
                {{ t('Step.Talents.Bardic-lore.description') }}
            </div>
        </ReferenceCard>
        <Card>
            <p v-html="t('Step.Bardic-lore.Wises.instructions')"></p>
            <ul class="wises">
                <li>
                    <InputGroup
                        v-model="adventurer.talentsData[Step.BARDIC_LORE].wises[0]"
                        :placeholder="t('Step.Background.Wises.placeholder-1')"
                    >
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.talentsData[Step.BARDIC_LORE].wises[1]"
                        :placeholder="t('Step.Background.Wises.placeholder-2')"
                    >
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.talentsData[Step.BARDIC_LORE].wises[2]"
                        :placeholder="t('Step.Background.Wises.placeholder-3')"
                    >
                    </InputGroup>
                </li>
            </ul>
            <CrucibleCard
                class="wises-crucible"
                :items="wisesData"
                :labelFunction="(item: string) => t(`Step.Background.Wises.${item}`)"
                v-model="adventurer.heritageCrucibles.wises"
                :title="t('Step.Heritage.Wises.title')"
            />
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import wisesData from '@/assets/data/wises.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.BARDIC_LORE)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.wises {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.wises-crucible {
    width: 100%;
}

@media (max-width: 768px) {
    .wises {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>
