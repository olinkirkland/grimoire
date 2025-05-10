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
                    <Button
                        @click="
                            onClickRollFolk();
                            onClickRollMood();
                            onClickRollLand();
                        "
                    >
                        <i class="fas fa-random"></i>
                        {{ t('roll') }}
                    </Button>
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
            <Card class="crucible">
                <!-- Folk -->
                <div class="crucible-row">
                    <header>
                        <h3>{{ t('Step.Heritage.folk') }}</h3>
                        <Button @click="onClickRollFolk">
                            <i class="fas fa-random"></i>
                            {{ t('roll') }}
                        </Button>
                    </header>
                    <ul class="grid folk-grid">
                        <li
                            v-for="f in heritagesData.folk"
                            :class="{ selected: adventurer.heritageCrucible.folk === f }"
                            @click="onClickCrucible('folk', f)"
                        >
                            <span>{{ t(`Step.Heritage.Folk.${f}`) }}</span>
                        </li>
                    </ul>
                </div>
                <!-- Mood -->
                <div class="crucible-row">
                    <header>
                        <h3>{{ t('Step.Heritage.mood') }}</h3>
                        <Button @click="onClickRollMood">
                            <i class="fas fa-random"></i>
                            {{ t('roll') }}
                        </Button>
                    </header>
                    <ul class="grid heritage-grid">
                        <li
                            v-for="h in heritagesData.mood"
                            :class="{ selected: adventurer.heritageCrucible.mood === h }"
                            @click="onClickCrucible('mood', h)"
                        >
                            <span>{{ t(`Step.Heritage.Mood.${h}`) }}</span>
                        </li>
                    </ul>
                </div>
                <!-- Land -->
                <div class="crucible-row">
                    <header>
                        <h3>{{ t('Step.Heritage.land') }}</h3>
                        <Button @click="onClickRollLand">
                            <i class="fas fa-random"></i>
                            {{ t('roll') }}
                        </Button>
                    </header>
                    <ul class="grid heritage-grid">
                        <li
                            v-for="h in heritagesData.land"
                            :class="{ selected: adventurer.heritageCrucible.land === h }"
                            @click="onClickCrucible('land', h)"
                        >
                            <span>{{ t(`Step.Heritage.Land.${h}`) }}</span>
                        </li>
                    </ul>
                </div>
            </Card>
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

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickRollFolk() {
    const folk = heritagesData.folk[Math.floor(Math.random() * heritagesData.folk.length)];
    props.adventurer.heritageCrucible.folk = folk;
}

function onClickRollMood() {
    const mood = heritagesData.mood[Math.floor(Math.random() * heritagesData.mood.length)];
    props.adventurer.heritageCrucible.mood = mood;
}

function onClickRollLand() {
    const land = heritagesData.land[Math.floor(Math.random() * heritagesData.land.length)];
    props.adventurer.heritageCrucible.land = land;
}

function onClickCrucible(category: string, value: string) {
    switch (category) {
        case 'folk':
            if (props.adventurer.heritageCrucible.folk === value) props.adventurer.heritageCrucible.folk = '';
            else props.adventurer.heritageCrucible.folk = value;
            break;
        case 'mood':
            if (props.adventurer.heritageCrucible.mood === value) props.adventurer.heritageCrucible.mood = '';
            else props.adventurer.heritageCrucible.mood = value;
            break;
        case 'land':
            if (props.adventurer.heritageCrucible.land === value) props.adventurer.heritageCrucible.land = '';
            else props.adventurer.heritageCrucible.land = value;
            break;
    }
}

const crucibleResults = computed(() => {
    const { folk, mood, land } = props.adventurer.heritageCrucible;
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

    &:nth-of-type(odd) {
        background-color: var(--overlay);
    }

    &:first-child {
        padding-top: 2rem;
    }

    &:last-child {
        padding-bottom: 2rem;
    }

    h3 {
        font-size: 2.4rem;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--surface-alt);
        width: 12rem;
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
        gap: 0.4rem;
        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 0.4rem solid var(--surface-alt);
            padding-bottom: 0.6rem;
            margin-bottom: 0.4rem;

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
