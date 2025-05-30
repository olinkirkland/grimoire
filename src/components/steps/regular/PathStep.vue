<template>
    <StepFrame>
        <ReferenceCard :page="52">
            <p v-html="t('Step.Path.instructions')"></p>
        </ReferenceCard>
        <Card class="paths">
            <ul class="paths-list">
                <li
                    v-for="(path, index) in pathsOrder"
                    :key="index"
                    @click="onClickPath(path)"
                    :class="{ selected: path === props.adventurer.path }"
                >
                    <h3>{{ t(`Step.Path.${capitalizeFirstLetter(path)}.name`) }}</h3>
                    <p class="also-known-as">
                        {{ t(`Step.Path.${capitalizeFirstLetter(path)}.also`) }}
                    </p>
                    <p v-html="t(`Step.Path.${capitalizeFirstLetter(path)}.description`)"></p>
                    <p class="core-talent" v-html="getCoreTalentLabel(path)"></p>
                </li>
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { Path } from '@/path';
import { CoreTalentsByPath } from '@/step';
import { trackEvent } from '@/tracker';
import { getTalentTemplate } from '@/utils/adventurer-util';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const pathsOrder = [
    Path.BARD,
    Path.BERSERKER,
    Path.CLERIC,
    Path.DRUID,
    Path.FIGHTER,
    Path.MONK,
    Path.PALADIN,
    Path.RANGER,
    Path.ROGUE,
    Path.SORCERER,
    Path.WARLOCK,
    Path.WIZARD,
    Path.ARTIFICER,
    Path.PSION,
    Path.ADVENTURER
];

function getCoreTalentLabel(path: string) {
    const coreTalentKey = capitalizeFirstLetter(CoreTalentsByPath[path]);
    return t('Step.Path.core-talent', {
        coreTalent: t(`Step.${coreTalentKey}.title`)
    });
}

function onClickPath(path: string) {
    // When the path is changed, remove its talentsData
    const oldPath = props.adventurer.path;
    // If there was an old path, remove its core talent from the talentsData
    if (oldPath) {
        const coreTalentKey = CoreTalentsByPath[oldPath];
        if (props.adventurer.talentsData[coreTalentKey]) delete props.adventurer.talentsData[coreTalentKey];
    }

    if (path === props.adventurer.path) {
        props.adventurer.path = null;
        return;
    }

    // Set the new path
    props.adventurer.path = path;

    // Update the adventurer's talentsData with the new path's core talent
    const newCoreTalentKey = CoreTalentsByPath[path];
    const talentTemplate = getTalentTemplate(newCoreTalentKey);
    if (talentTemplate) props.adventurer.talentsData[newCoreTalentKey] = talentTemplate;

    trackEvent('path-selected', { path });
}
</script>

<style scoped lang="scss">
.card.paths {
    width: 100%;
    ul.paths-list {
        width: 100%;
        display: grid;
        gap: 0.4rem;
        grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
        grid-auto-rows: 1fr;

        > li {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            border: 1px solid transparent;
            padding: 1.2rem 1.6rem;
            border-radius: 5px;

            &.selected {
                background-color: var(--primary-light);
                border: 1px solid var(--primary);
                box-shadow: var(--shadow-sm);
                > h3 {
                    color: var(--primary);
                }
                > p.also-known-as {
                    color: var(--primary-alt);
                    opacity: 0.6;
                }
                > p {
                    color: var(--primary);
                }
            }

            > p.also-known-as {
                color: var(--surface-alt);
                font-size: 1.4rem;
                font-style: italic;
                margin-top: -0.4rem;
                margin-bottom: 0.8rem;
            }
        }
    }
}

p.core-talent {
    padding-top: 1rem;
    font-size: 1.4rem;
}

@media (max-width: 768px) {
    .card.paths {
        ul.paths-list {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
        }
    }
}
</style>
