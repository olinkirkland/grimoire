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
                <h3>◆ {{ t(`Step.Warsongs.title`) }}</h3>
                <p v-html="t('Step.Talents.Warsongs.description')"></p>
            </div>
        </ReferenceCard>

        <Card class="song-composition">
            <p v-html="t('Step.Bardsong.instructions')"></p>
            <div class="inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.WARSONGS].songs[0]"
                    :placeholder="t('Step.Warsongs.placeholder-1')"
                />
                <InputGroup
                    v-model="adventurer.talentsData[Step.WARSONGS].songs[1]"
                    :placeholder="t('Step.Warsongs.placeholder-2')"
                />
                <InputGroup
                    v-model="adventurer.talentsData[Step.WARSONGS].songs[2]"
                    :placeholder="t('Step.Warsongs.placeholder-3')"
                />
            </div>

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
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bardsongData from '@/assets/data/bardsong.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import InputGroup from '@/components/ui/InputGroup.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.WARSONGS)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.inputs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .inputs {
        grid-template-columns: 1fr;
    }
}
</style>
