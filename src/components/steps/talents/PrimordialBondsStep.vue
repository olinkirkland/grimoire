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
                <h3>⬙ {{ t(`Step.Primordial-bonds.title`) }}</h3>
                <p v-html="t(`Step.Talents.Primordial-bonds.description`)"></p>
            </div>
        </ReferenceCard>
        <Card glass>
            <ul class="bonds-list">
                <li v-for="(bond, element) in adventurer.talentsData[Step.PRIMORDIAL_BONDS].bonds" :key="bond">
                    <Card class="bond-card">
                        <div class="force-image">
                            <div class="force-image__background"></div>
                            <div class="mask" :style="getMaskStyle('element')">
                                <div :style="getGradientStyle(element.toString())"></div>
                            </div>
                        </div>
                        <div>
                            <p v-html="t(`Step.Bonds.bond-with`, { name: bond.name || '...' })"></p>
                        </div>
                        <InputGroup v-model="bond.intensity" :placeholder="t('Step.Bonds.Intensity.placeholder')">
                            <span>{{ t('Step.Bonds.Intensity.label') }}</span>
                        </InputGroup>
                        <InputGroup v-model="bond.nature" :placeholder="t('Step.Bonds.Nature.placeholder')">
                            <span>{{ t('Step.Bonds.Nature.label') }}</span>
                        </InputGroup>
                        <TextAreaGroup
                            v-model="bond.description"
                            :placeholder="t('Step.Primordial-bonds.Description.placeholder')"
                            class="description"
                        >
                            <span>{{ t('Step.Bonds.Description.label') }}</span>
                        </TextAreaGroup>
                    </Card>
                </li>
            </ul>
        </Card>
        <Card>
            <p v-html="t('Step.Bonds.advice')"></p>
            <TableGroup>
                <TableCard :title="t('Step.Bonds.Intensity.label')" :items="bondsData.intensity">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bonds.Intensity.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Bonds.Nature.label')" :items="bondsData.nature">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bonds.Nature.${item}`) }}</span>
                    </template>
                </TableCard>
            </TableGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bondsData from '@/assets/data/bonds.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import InputGroup from '@/components/ui/InputGroup.vue';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.PRIMORDIAL_BONDS)!;

function getMaskStyle(force: string) {
    return {
        '-webkit-mask-image': `url('${BASE_URL}assets/images/classic-elements/${force}.png')`,
        'mask-image': `url('${BASE_URL}assets/images/classic-elements/${force}.png')`
    };
}

function getGradientStyle(force: string) {
    const colorsByForce: Record<string, string[]> = {
        air: ['#87CEEB', '#c0e0fa'],
        earth: ['#8a391a', '#ab4118'],
        fire: ['#e03131', '#f59f00'],
        water: ['#4682B4', '#81b2db']
    };

    if (!colorsByForce[force]) return {};

    const [color1, color2] = colorsByForce[force];
    return { background: `linear-gradient(to top, ${color1}, ${color2})` };
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.force-image {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;

    > .mask {
        width: 100%;
        height: 100%;
        mask-repeat: no-repeat;
        mask-size: cover;

        > div {
            width: 100%;
            height: 100%;
            &.no-gradient {
                background: none !important;
                background-color: var(--surface-alt) !important;
            }
        }
    }
}

ul.bonds-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
}

.force-image__background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    height: 4rem;
    background-color: var(--primary);
    border-radius: 50%;
    opacity: 0.3;
    filter: blur(0.7rem);
}

@media (max-width: 768px) {
    ul.bonds-list {
        grid-template-columns: 1fr;
    }
}
</style>
