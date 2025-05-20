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
                <h3>◇ {{ t(`Step.Wisps.title`) }}</h3>
                <p v-html="t(`Step.Wisps.description`)"></p>
                <ul class="traits-list">
                    <ToggleCard
                        v-for="trait in wispsData"
                        :key="trait"
                        @click="onClickToggleTrait(trait)"
                        :selected="adventurer.talentsData[Step.WISPS].traits.includes(trait)"
                    >
                        <p>{{ t(`Step.Wisps.Traits.${trait}`) }}</p>
                    </ToggleCard>
                </ul>
            </div>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import wispsData from '@/assets/data/wisps.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.WISPS)!;

function onClickToggleTrait(trait: string) {
    const index = props.adventurer.talentsData[Step.WISPS].traits.indexOf(trait);
    if (index === -1) props.adventurer.talentsData[Step.WISPS].traits.push(trait);
    else props.adventurer.talentsData[Step.WISPS].traits.splice(index, 1);
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.traits-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-top: 1rem;
}

@media (max-width: 768px) {
}
</style>
