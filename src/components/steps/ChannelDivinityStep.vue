<template>
    <StepFrame>
        <ReferenceCard :page="58">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Channel-divinity.title`) }}</h3>
                <p v-html="t(`Step.Channel-divinity.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Channel-divinity.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="create-god">
            <p v-html="t('Step.Channel-divinity.God-name.instructions')"></p>
            <div class="name-inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.CHANNEL_DIVINITY].god.name"
                    :placeholder="t('Step.Channel-divinity.God-name.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.God-name.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.CHANNEL_DIVINITY].god.epithet"
                    :placeholder="t('Step.Channel-divinity.God-epithet.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.God-epithet.label') }} </span>
                </InputGroup>
            </div>
            <NamePicker
                id="god-name"
                :name-tables="nameTablesData"
                :name-category-label-function="(key) => t(`Step.Channel-divinity.God-name.Generator.Tables.${key}`)"
                v-model:name="adventurer.talentsData[Step.CHANNEL_DIVINITY].god.name"
            >
                <p v-html="t('Step.Channel-divinity.God-name.Generator.instructions')"></p>
            </NamePicker>
        </Card>
        <Card>
            <p v-html="t('Step.Channel-divinity.Domains.instructions')"></p>
            <div class="domains-list">
                <DomainCard
                    v-for="(domain, index) in adventurer.talentsData[Step.CHANNEL_DIVINITY].domains"
                    :primary="index === 0"
                    :key="index"
                    :domain="domain"
                ></DomainCard>
            </div>
        </Card>
        <Card class="holy-symbol">
            <p v-html="t('Step.Channel-divinity.Holy-symbol.instructions')"></p>
            <ul class="holy-symbols-list">
                <li v-for="symbol in holySymbolsData" :key="symbol">
                    <img :src="`${BASE_URL}assets/holy-symbols/${symbol}`" />
                </li>
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import nameTablesData from '@/assets/data/god-name-tables.json';
import holySymbolsData from '@/assets/data/holy-symbols.json';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
import { Step } from '@/step';
import { generateMarkovName } from '@/utils/adventurer-util';
import { ref } from 'vue';
import StepFrame from '../StepFrame.vue';
import DomainCard from '../ui/DomainCard.vue';
import InputGroup from '../ui/InputGroup.vue';
import NamePicker from '../ui/NamePicker.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

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

    const generatedName = generateMarkovName(allNames, 2);
    if (generatedName) props.adventurer.talentsData[Step.CHANNEL_DIVINITY].god.name = generatedName;
}

function onClickRollName() {
    // Pick a random name from the selected name tables
    const allNames: string[] = [];
    activeNameTables.value.forEach((nameTableKey) => {
        const nameTableData = nameTablesData[nameTableKey as keyof typeof nameTablesData];
        allNames.push(...nameTableData);
    });

    const randomName = allNames[Math.floor(Math.random() * allNames.length)];
    if (randomName) props.adventurer.talentsData[Step.CHANNEL_DIVINITY].god.name = randomName;
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.god-name-input {
    width: 100%;
    max-width: 100%;
}

.name-generator {
    width: 100%;

    > .pick-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

.domain-block {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
}

.domains-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.holy-symbols-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    > li {
        width: 8rem;
        height: 8rem;

        > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 0.4rem;
        }
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

@media (max-width: 768px) {
    .domains-list {
        grid-template-columns: 1fr;
    }

    .name-generator {
        > .pick-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .name-inputs {
        grid-template-columns: 1fr !important;
    }

    .holy-symbols-list {
        gap: 0.4rem;

        > li {
            width: 6rem;
            height: 6rem;
        }
    }
}
</style>
