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
                <ul class="pick-list">
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
                <Card>
                    <ul class="pick-list">
                        <li v-for="(trait, index) in traitsData" :key="index" @click="onClickCycleTrait(trait)">
                            <i :class="getTraitSelectionClass(trait)"></i>
                            <span>{{ t(`Step.Personality.Traits.${trait}`) }}</span>
                        </li>
                    </ul>
                </Card>
            </Card>
            <Card class="desires">
                <p v-html="t('Step.Personality.Desires.instructions')"></p>
                <Card>
                    <ul class="pick-list">
                        <li v-for="(desire, index) in desiresData" :key="index" @click="onClickCycleDesire(desire)">
                            <i :class="getDesireSelectionClass(desire)"></i>
                            <span>{{ t(`Step.Personality.Desires.${desire}`) }}</span>
                        </li>
                    </ul>
                </Card>
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

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const activeNameTables = ref<string[]>([]);

function getTraitSelectionClass(trait: string): string {
    if (props.adventurer.traits.includes(trait)) return 'fas fa-circle';
    return props.adventurer.notTraits.includes(trait) ? 'fas fa-ban' : 'far fa-circle';
}

function onClickCycleTrait(trait: string) {
    const isInTraits = props.adventurer.traits.includes(trait);
    const isInNotTraits = props.adventurer.notTraits.includes(trait);

    // If it's not in traits or notTraits, add it to traits, and return
    if (!isInTraits && !isInNotTraits) {
        props.adventurer.traits.push(trait);
        return;
    }

    // If it's in traits, remove it from traits, add it to notTraits, and return
    if (isInTraits) {
        props.adventurer.traits = props.adventurer.traits.filter((t) => t !== trait);
        props.adventurer.notTraits.push(trait);
        return;
    }

    // If it's in notTraits, remove it from notTraits, and return
    if (isInNotTraits) {
        props.adventurer.notTraits = props.adventurer.notTraits.filter((t) => t !== trait);
        return;
    }
}

function getDesireSelectionClass(desire: string): string {
    if (props.adventurer.desires.includes(desire)) return 'fas fa-circle';
    return props.adventurer.notDesires.includes(desire) ? 'fas fa-ban' : 'far fa-circle';
}

function onClickCycleDesire(desire: string) {
    const isInDesires = props.adventurer.desires.includes(desire);
    const isInNotDesires = props.adventurer.notDesires.includes(desire);

    // If it's not in desires or notDesires, add it to desires, and return
    if (!isInDesires && !isInNotDesires) {
        props.adventurer.desires.push(desire);
        return;
    }

    // If it's in desires, remove it from desires, add it to notDesires, and return
    if (isInDesires) {
        props.adventurer.desires = props.adventurer.desires.filter((d) => d !== desire);
        props.adventurer.notDesires.push(desire);
        return;
    }

    // If it's in notDesires, remove it from notDesires, and return
    if (isInNotDesires) {
        props.adventurer.notDesires = props.adventurer.notDesires.filter((d) => d !== desire);
        return;
    }
}

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

    const generatedName = generateMarkovName(allNames);
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
    flex: 1;
    .card {
        width: 100%;
        background-color: var(--overlay);
        padding: 0.4rem;
    }
}

ul.pick-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    > li {
        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-style: italic;

        > span {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.name-generator {
    width: 100%;

    > .pick-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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
