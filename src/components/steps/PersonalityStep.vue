<template>
    <StepFrame>
        <Card class="name">
            <p v-html="t('Step.Personality.Name.instructions')"></p>
            <div class="name-inputs">
                <InputGroup v-model="adventurer.name" :placeholder="t('Step.Personality.Adventurer-name.placeholder')">
                    <span>{{ t('Step.Personality.Adventurer-name.label') }}</span>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.playerName"
                    :placeholder="t('Step.Personality.Player-name.placeholder')"
                >
                    <span>{{ t('Step.Personality.Player-name.label') }}</span>
                </InputGroup>
            </div>
            <Card class="name-generator">
                <p v-html="t('Step.Personality.Name.Generator.instructions')"></p>
                <ul class="names-list">
                    <li
                        v-for="(nameTableKey, index) in Object.keys(nameTablesData)"
                        :key="index"
                        @click="toggleNameTable(nameTableKey)"
                    >
                        <i
                            :class="activeNameTables.includes(nameTableKey) ? 'fas fa-check-square' : 'far fa-square'"
                        ></i>
                        <span>{{ t(`Step.Personality.Name.Generator.Tables.${nameTableKey}`) }}</span>
                    </li>
                </ul>
                <div class="flex">
                    <Button @click="onClickGenerateName" :disabled="activeNameTables.length === 0">
                        {{ t('Step.Personality.Name.Generator.label') }}
                    </Button>
                    <Button @click="onClickRollName" :disabled="activeNameTables.length === 0">
                        <i class="fas fa-random"></i>
                        <span>{{ t('roll') }}</span>
                    </Button>
                </div>
            </Card>
        </Card>
        <div class="traits-and-desires">
            <Card class="traits">
                <p v-html="t('Step.Personality.Traits.instructions')"></p>
                <PickList
                    :items="traitsData"
                    v-model:selected-items="adventurer.traits"
                    v-model:not-selected-items="adventurer.notTraits"
                    :label-function="(item) => t(`Step.Personality.Traits.${item}`)"
                />
            </Card>
            <Card class="desires">
                <p v-html="t('Step.Personality.Desires.instructions')"></p>
                <PickList
                    :items="desiresData"
                    v-model:selected-items="adventurer.desires"
                    v-model:not-selected-items="adventurer.notDesires"
                    :label-function="(item) => t(`Step.Personality.Desires.${item}`)"
                />
            </Card>
        </div>
        <Card class="features">
            <p v-html="t('Step.Personality.Features.instructions')"></p>
            <ul class="features-list">
                <li>
                    <InputGroup
                        v-model="adventurer.features[0]"
                        :placeholder="t('Step.Personality.Features.placeholder-1')"
                    >
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.features[1]"
                        :placeholder="t('Step.Personality.Features.placeholder-2')"
                    >
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.features[2]"
                        :placeholder="t('Step.Personality.Features.placeholder-3')"
                    >
                    </InputGroup>
                </li>
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import desiresData from '@/assets/data/desires.json';
import nameTablesData from '@/assets/data/name-tables.json';
import traitsData from '@/assets/data/traits.json';
import { t } from '@/i18n/locale';
import { generateMarkovName } from '@/utils/adventurer-util';
import { ref } from 'vue';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import PickList from '../ui/PickList.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const activeNameTables = ref<string[]>([]);

function toggleNameTable(nameTableKey: string) {
    if (activeNameTables.value.includes(nameTableKey))
        activeNameTables.value = activeNameTables.value.filter((table) => table !== nameTableKey);
    else activeNameTables.value.push(nameTableKey);
}

function onClickGenerateName() {
    // Generate a name using the selected name tables
    const allNames: string[] = [];
    activeNameTables.value.forEach((nameTableKey) => {
        const nameTableData = nameTablesData[nameTableKey as keyof typeof nameTablesData];
        allNames.push(...nameTableData);
    });

    const generatedName = generateMarkovName(allNames, 3);
    if (generatedName) props.adventurer.name = generatedName;
}

function onClickRollName() {
    // Pick a random name from the selected name tables
    const allNames: string[] = [];
    activeNameTables.value.forEach((nameTableKey) => {
        const nameTableData = nameTablesData[nameTableKey as keyof typeof nameTablesData];
        allNames.push(...nameTableData);
    });

    const randomName = allNames[Math.floor(Math.random() * allNames.length)];
    if (randomName) props.adventurer.name = randomName;
}
</script>

<style scoped lang="scss">
.card.name {
    width: 100%;

    .name-inputs {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        > .input-group {
            width: 100%;
            max-width: 100%;
        }
    }
}

.traits-and-desires {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.card.traits,
.card.desires {
    flex: 1; // Make the cards take equal space
}

.name-generator {
    width: 100%;

    > ul.names-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 0.4rem;

        > li {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            cursor: pointer;

            i {
                font-size: 1.6rem;
            }
        }
    }
}

.features-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;
}

@media (max-width: 768px) {
    .traits-and-desires {
        flex-direction: column;
    }

    .name-inputs {
        grid-template-columns: 1fr !important;
    }

    .name-generator {
        > .pick-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .features-list {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
}
</style>
