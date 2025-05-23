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
                <h3>⬦ {{ t(`Step.Eldritch-affinity.title`) }}</h3>
                <p v-html="t(`Step.Talents.Eldritch-affinity.description`)"></p>
                <p v-html="t(`Step.Eldritch-affinity.instructions`)"></p>
                <ul class="magic-paths">
                    <ToggleCard
                        v-for="(magicPath, index) in magicPathsData"
                        :key="index"
                        @click="onToggleMagicPath(magicPath)"
                        :selected="adventurer.talentsData[Step.ELDRITCH_AFFINITY].magicPaths.includes(magicPath)"
                    >
                        <span>{{ t(`Step.Sorcery.Magic-paths.${magicPath}`) }}</span>
                        <em class="text-center">{{ t(`Step.Sorcery.Magic-paths.label`) }}</em>
                    </ToggleCard>
                </ul>
                <ul class="magic-techniques">
                    <ToggleCard
                        v-for="(technique, index) in magicTechniquesData"
                        :key="index"
                        @click="onToggleTechnique(technique)"
                        :selected="adventurer.talentsData[Step.ELDRITCH_AFFINITY].techniques.includes(technique)"
                    >
                        <span>{{ t(`Step.Sorcery.Magic-techniques.${technique}`) }}</span>
                        <em class="text-center">{{ t(`Step.Sorcery.Magic-techniques.label`) }}</em>
                    </ToggleCard>
                </ul>
            </div>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import magicPathsData from '@/assets/data/magic-paths.json';
import magicTechniquesData from '@/assets/data/magic-techniques.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.ELDRITCH_AFFINITY)!;

function onToggleMagicPath(magicPath: string) {
    const index = props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].magicPaths.indexOf(magicPath);
    if (index === -1) props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].magicPaths.push(magicPath);
    else props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].magicPaths.splice(index, 1);
}

function onToggleTechnique(magicTechnique: string) {
    const index = props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].techniques.indexOf(magicTechnique);
    if (index === -1) props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].techniques.push(magicTechnique);
    else props.adventurer.talentsData[Step.ELDRITCH_AFFINITY].techniques.splice(index, 1);
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card--reference p {
    margin-bottom: 0.4rem;
}

ul.magic-paths,
ul.magic-techniques {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
}

@media (max-width: 1024px) {
    ul.magic-paths,
    ul.magic-techniques {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 768px) {
    ul.magic-paths,
    ul.magic-techniques {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
