<template>
    <StepFrame>
        <ReferenceCard :page="72" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Sorcery.title`) }}</h3>
                <p v-html="t(`Step.Sorcery.description`)"></p>
                <ul class="magic-paths">
                    <ToggleCard
                        v-for="(magicPath, index) in magicPathsData"
                        :key="index"
                        @click="onToggleMagicPath(magicPath)"
                        :selected="adventurer.talentsData[Step.SORCERY].magicPathsAndTechniques.includes(magicPath)"
                    >
                        <span>{{ t(`Step.Sorcery.Magic-paths.${magicPath}`) }}</span>
                        <em class="text-center">{{ t(`Step.Sorcery.Magic-paths.label`) }}</em>
                    </ToggleCard>
                </ul>
                <ul class="magic-techniques">
                    <ToggleCard
                        v-for="(magicTechnique, index) in magicTechniquesData"
                        :key="index"
                        @click="onToggleMagicPath(magicTechnique)"
                        :selected="
                            adventurer.talentsData[Step.SORCERY].magicPathsAndTechniques.includes(magicTechnique)
                        "
                    >
                        <span>{{ t(`Step.Sorcery.Magic-techniques.${magicTechnique}`) }}</span>
                        <em class="text-center">{{ t(`Step.Sorcery.Magic-techniques.label`) }}</em>
                    </ToggleCard>
                </ul>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Sorcery.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="random-wild-surges">
            <p v-html="t('Step.Sorcery.Wild-surges.instructions')"></p>
            <div class="crucibles">
                <CrucibleCard
                    :title="t('Step.Sorcery.Wild-surges.A.title')"
                    :items="wildSurgesData.a"
                    :label-function="(item: string) => t(`Step.Sorcery.Wild-surges.A.${item}`)"
                    v-model="adventurer.talentsData[Step.SORCERY].wildSurgeCrucibles.a"
                />
                <CrucibleCard
                    :title="t('Step.Sorcery.Wild-surges.B.title')"
                    :items="wildSurgesData.b"
                    :label-function="(item: string) => t(`Step.Sorcery.Wild-surges.B.${item}`)"
                    v-model="adventurer.talentsData[Step.SORCERY].wildSurgeCrucibles.b"
                />
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import magicPathsData from '@/assets/data/magic-paths.json';
import magicTechniquesData from '@/assets/data/magic-techniques.json';
import wildSurgesData from '@/assets/data/wild-surges.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onToggleMagicPath(magicPath: string) {
    const index = props.adventurer.talentsData[Step.SORCERY].magicPathsAndTechniques.indexOf(magicPath);
    if (index === -1) {
        props.adventurer.talentsData[Step.SORCERY].magicPathsAndTechniques.push(magicPath);
    } else {
        props.adventurer.talentsData[Step.SORCERY].magicPathsAndTechniques.splice(index, 1);
    }
}
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

ul.magic-paths,
ul.magic-techniques {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
}

.crucibles {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    > .card {
        width: 100%;
        grid-column: span 1;
    }
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

    .crucibles {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
