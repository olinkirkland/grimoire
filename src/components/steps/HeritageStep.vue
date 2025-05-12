<template>
    <StepFrame>
        <ReferenceCard :page="51">
            <p v-html="t('Step.Heritage.instructions')"></p>
        </ReferenceCard>
        <Card class="heritage-and-wises">
            <section>
                <InputGroup v-model="adventurer.heritage.name" :placeholder="t('Step.Heritage.placeholder')">
                    <span>{{ t('Step.Heritage.label') }}</span>
                </InputGroup>
                <div class="crucible-results">
                    <CrucibleCard>
                        {{ t(`Step.Heritage.Mood.${adventurer.heritageCrucibles.mood}`) }}
                        <Button @click="onClickRollMood">
                            <i class="fas fa-random"></i>
                        </Button>
                    </CrucibleCard>
                    <p>
                        {{
                            crucibleResults
                                ? t('Step.Heritage.crucible-results')
                                : t('Step.Heritage.crucible-results-empty')
                        }}
                        <span>{{ crucibleResults }}</span>
                    </p>
                </div>
            </section>

            <section>
                <p v-html="t('Step.Heritage.Wises.instructions')"></p>
                <ul class="wises">
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[0]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-1')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[1]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-2')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[2]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-3')"
                        >
                        </InputGroup>
                    </li>
                </ul>
            </section>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import heritagesData from '@/assets/data/heritages.json';
import { t } from '@/i18n/locale';
import { computed } from 'vue';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import InputGroup from '../ui/InputGroup.vue';
import ButtonBar from '../ui/ButtonBar.vue';
import CrucibleCard from '../ui/CrucibleCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickRollFolk() {
    const folk = heritagesData.folk[Math.floor(Math.random() * heritagesData.folk.length)];
    props.adventurer.heritageCrucibles.folk = folk;
}

function onClickRollMood() {
    const mood = heritagesData.mood[Math.floor(Math.random() * heritagesData.mood.length)];
    props.adventurer.heritageCrucibles.mood = mood;
}

function onClickRollLand() {
    const land = heritagesData.land[Math.floor(Math.random() * heritagesData.land.length)];
    props.adventurer.heritageCrucibles.land = land;
}

function onClickCrucible(category: string, value: string) {
    switch (category) {
        case 'folk':
            if (props.adventurer.heritageCrucibles.folk === value) props.adventurer.heritageCrucibles.folk = '';
            else props.adventurer.heritageCrucibles.folk = value;
            break;
        case 'mood':
            if (props.adventurer.heritageCrucibles.mood === value) props.adventurer.heritageCrucibles.mood = '';
            else props.adventurer.heritageCrucibles.mood = value;
            break;
        case 'land':
            if (props.adventurer.heritageCrucibles.land === value) props.adventurer.heritageCrucibles.land = '';
            else props.adventurer.heritageCrucibles.land = value;
            break;
    }
}

const crucibleResults = computed(() => {
    const { folk, mood, land } = props.adventurer.heritageCrucibles;
    if (!folk && !mood && !land) return null; // No results yet
    // Return comma joined, whatever exists
    const folkString = folk ? t(`Step.Heritage.Folk.${folk}`) : null;
    const moodString = mood ? t(`Step.Heritage.Mood.${mood}`) : null;
    const landString = land ? t(`Step.Heritage.Land.${land}`) : null;
    const results = [folkString, moodString, landString].filter(Boolean);
    return results.join(', ');
});
</script>

<style scoped lang="scss">
.heritage-and-wises {
    width: 100%;
    .input-group {
        width: 100%;
        max-width: 100%;
    }

    > section:not(:last-child) {
        margin-bottom: 0.8rem;
    }
}

.wises {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;
}

.crucible {
    padding: 0;
    width: 100%;
    gap: 0;
}

.crucible-row {
    display: flex;
    padding: 1.6rem 2rem;
    width: 100%;

    header {
        width: 12rem;
    }

    &:nth-of-type(odd) {
        background-color: var(--overlay);
    }

    &:first-child {
        padding-top: 2rem;
    }

    &:last-child {
        padding-bottom: 2rem;
    }

    ul {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        > li {
            padding: 0.2rem 1.2rem;
            font-style: italic;
            cursor: pointer;

            &.selected > span {
                color: var(--surface-alt);
            }
        }
    }
}

.crucible-results {
    display: flex;
    align-items: center;
    gap: 1rem;
    p > span {
        font-style: italic;
        color: var(--surface-alt);
    }
}

@media (max-width: 768px) {
    .wises {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }

    .crucible-row {
        flex-direction: column;
        header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 0.6rem;

            h3 {
                font-size: 3.2rem;
            }
        }

        ul {
            grid-template-columns: repeat(3, 1fr);
            > li {
                padding: 0.4rem;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
