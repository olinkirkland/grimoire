<template>
    <StepFrame>
        <ReferenceCard :page="70" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Expertise.title`) }}</h3>
                <p v-html="t(`Step.Expertise.description`)"></p>
                <div class="skillset-list">
                    <ToggleCard
                        v-for="skillset in skillsetData"
                        @click="adventurer.talentsData[Step.EXPERTISE].skillset = skillset"
                        :selected="adventurer.talentsData[Step.EXPERTISE].skillset === skillset"
                        :key="skillset"
                    >
                        <p>{{ t(`Step.Expertise.Skillset.${capitalizeFirstLetter(skillset)}.name`) }}</p>
                        <em>{{ t(`Step.Expertise.Skillset.${capitalizeFirstLetter(skillset)}.description`) }}</em>
                    </ToggleCard>
                </div>

                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Expertise.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="thieves-guild">
            <p v-html="t('Step.Expertise.Thieves-guild.instructions')"></p>
            <p v-html="t('Step.Expertise.Thieves-guild.picker-instructions')"></p>
            <PickList
                v-model:selected-items="adventurer.talentsData[Step.EXPERTISE].guildTraits"
                v-model:not-selected-items="adventurer.talentsData[Step.EXPERTISE].notGuildTraits"
                :items="guildTraitsData"
                :label-function="(item: string) => t(`Step.Expertise.Thieves-guild.Table.${item}`)"
            />
        </Card>
        <Card class="criminal-history">
            <p v-html="t('Step.Expertise.Crime.instructions')"></p>
            <InputGroup
                v-model="adventurer.talentsData[Step.EXPERTISE].crime"
                :placeholder="t('Step.Expertise.Crime.placeholder')"
            >
                {{ t('Step.Expertise.Crime.label') }}
            </InputGroup>
            <TableGroup>
                <TableCard :title="t('Step.Expertise.Crime.Severity.label')" :items="crimeData.severity">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Expertise.Crime.Severity.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Expertise.Crime.Reputation.label')" :items="crimeData.reputation">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Expertise.Crime.Reputation.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Expertise.Crime.Reaction.label')" :items="crimeData.reaction">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Expertise.Crime.Reaction.${item}`) }}</span>
                    </template>
                </TableCard>
            </TableGroup>
            <TableCard :title="t('Step.Expertise.Crime.Nature.label')" :items="crimeData.nature" many>
                <template #item="{ item }">
                    <span class="ellipsis text-center">{{ t(`Step.Expertise.Crime.Nature.${item}`) }}</span>
                </template>
            </TableCard>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import crimeData from '@/assets/data/crime.json';
import guildTraitsData from '@/assets/data/guild-traits.json';
import skillsetData from '@/assets/data/skillset.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

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

.skillset-list {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

@media (max-width: 768px) {
    .skillset-list {
        grid-template-columns: 1fr;
    }
}
</style>
