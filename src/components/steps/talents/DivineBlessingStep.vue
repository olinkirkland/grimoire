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
                <h3>⬥ {{ t(`Step.Divine-blessing.title`) }}</h3>
                <p v-html="t(`Step.Talents.Divine-blessing.description`)"></p>
            </div>
        </ReferenceCard>
        <Card class="create-god">
            <p v-html="t('Step.Channel-divinity.God-name.instructions')"></p>
            <div class="name-inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.DIVINE_BLESSING].god.name"
                    :placeholder="t('Step.Channel-divinity.God-name.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.God-name.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.DIVINE_BLESSING].god.epithet"
                    :placeholder="t('Step.Channel-divinity.God-epithet.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.God-epithet.label') }} </span>
                </InputGroup>
            </div>
            <div class="name-and-domain">
                <NamePicker
                    id="god-name"
                    :name-tables="nameTablesData"
                    :name-category-label-function="
                        (key: string) => t(`Step.Channel-divinity.God-name.Generator.Tables.${key}`)
                    "
                    v-model:name="adventurer.talentsData[Step.DIVINE_BLESSING].god.name"
                >
                    <p v-html="t('Step.Channel-divinity.God-name.Generator.instructions')"></p>
                </NamePicker>
                <DomainCard :domain="adventurer.talentsData[Step.DIVINE_BLESSING].domain"></DomainCard>
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
import talentDefinitionsData from '@/assets/data/talents.json';
import DomainCard from '@/components/ui/DomainCard.vue';
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

const talent = talentDefinitionsData.find((talent) => talent.id === Step.DIVINE_BLESSING)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
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

.name-and-domain {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

@media (max-width: 768px) {
    .name-inputs {
        grid-template-columns: 1fr !important;
    }

    .name-and-domain {
        grid-template-columns: 1fr !important;
    }
}
</style>
