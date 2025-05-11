<template>
    <StepFrame>
        <ReferenceCard :page="54">
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
                </li>
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import { Path } from '@/path';

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
    Path.WIZARD
];

function onClickPath(path: string) {
    if (path === props.adventurer.path) props.adventurer.path = null;
    else props.adventurer.path = path;
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

        > li {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            user-select: none;
            border: 1px solid transparent;
            padding: 1rem;
            border-radius: 5px;

            &.selected {
                background-color: var(--surface);
                border: 1px solid var(--surface-alt);
            }

            > p.also-known-as {
                color: var(--surface-alt);
                font-size: 1.4rem;
                font-style: italic;
                margin-bottom: 0.4rem;
            }
        }
    }
}

@media (max-width: 768px) {
    .card.paths {
        ul.paths-list {
            grid-template-columns: 1fr;
        }
    }
}
</style>
