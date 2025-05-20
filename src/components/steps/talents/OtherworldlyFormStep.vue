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
                <h3>⬥ {{ t(`Step.Otherworldly-form.title`) }}</h3>
                <p v-html="t(`Step.Otherworldly-form.description`)"></p>
                <ul class="effects-list">
                    <Card
                        v-for="(effect, index) in otherworldlyFormData"
                        :key="index"
                        :class="{ selected: isEffectSelected(effect) }"
                        @click="onToggleEffect(effect)"
                    >
                        <span v-html="t(`Step.Otherworldly-form.Effects.${effect}`)"></span>
                    </Card>
                </ul>
            </div>
        </ReferenceCard>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import otherworldlyFormData from '@/assets/data/otherworldly-form.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.OTHERWORLDLY_FORM)!;

function onToggleEffect(effect: string) {
    const index = props.adventurer.talentsData[Step.OTHERWORLDLY_FORM].effects.indexOf(effect);
    if (index === -1) {
        props.adventurer.talentsData[Step.OTHERWORLDLY_FORM].effects.push(effect);
    } else {
        props.adventurer.talentsData[Step.OTHERWORLDLY_FORM].effects.splice(index, 1);
    }
}

function isEffectSelected(effect: string) {
    return props.adventurer.talentsData[Step.OTHERWORLDLY_FORM].effects.includes(effect);
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card--reference p {
    margin-bottom: 1rem;
}

ul.effects-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    .card {
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        align-items: center;
        gap: 0;
        transition: box-shadow 0.2s ease-in-out;
        padding: 1rem;

        > em {
            font-size: 1.2rem;
            color: var(--surface-alt);
        }

        &.selected {
            transition: none;
            box-shadow: none;
            background-color: var(--primary-light);
            color: var(--primary-alt);
            > em {
                color: var(--primary);
                opacity: 0.6;
            }
        }
    }
}

@media (max-width: 768px) {
}
</style>
