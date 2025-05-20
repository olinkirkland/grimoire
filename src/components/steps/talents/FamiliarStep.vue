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
                <h3>◇ {{ t(`Step.Familiar.title`) }}</h3>
                <p v-html="t(`Step.Talents.Familiar.description`)"></p>
            </div>
        </ReferenceCard>
        <Card>
            <p v-html="t(`Step.Familiar.Name.instructions`)"></p>
            <div class="inputs">
                <InputGroup
                    v-model="adventurer.talentsData.familiar.name"
                    :placeholder="t(`Step.Familiar.Name.placeholder`)"
                >
                    <span>{{ t(`Step.Familiar.Name.label`) }}</span>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData.familiar.description"
                    :placeholder="t(`Step.Familiar.Description.placeholder`)"
                >
                    <span>{{ t(`Step.Familiar.Description.label`) }}</span>
                </InputGroup>
            </div>
            <NamePicker
                id="adventurer-name"
                :name-tables="nameTablesData"
                :name-category-label-function="(item: string) => t(`Step.Familiar.Name.Generator.Tables.${item}`)"
                v-model:name="adventurer.talentsData.familiar.name"
            >
                <p v-html="t('Step.Familiar.Name.Generator.instructions')"></p>
            </NamePicker>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import nameTablesData from '@/assets/data/familiar-name-tables.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import NamePicker from '@/components/ui/NamePicker.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.FAMILIAR)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.inputs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .inputs {
        grid-template-columns: 1fr;
    }
}
</style>
