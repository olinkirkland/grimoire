<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t(`Step.Talents.talent-by-path`, { path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`) }) }}</h2>
                <h3>◇ {{ t(`Step.Arcane-specialty.title`) }}</h3>
                <p v-html="t(`Step.Arcane-specialty.description`)"></p>
            </div>
        </ReferenceCard>
        <Card>
            <InputGroup
                v-model="adventurer.talentsData[Step.ARCANE_SPECIALTY].magicSchool"
                :placeholder="t('Step.Arcane-specialty.Magic-school.placeholder')"
            >
                {{ t('Step.Arcane-specialty.Magic-school.label') }}
            </InputGroup>
            <TableCard :title="t('Step.Spellcraft.Magic-schools.label')" :items="spellcraftData.magicSchools">
                <template #item="{ item }">
                    <div
                        class="school-item"
                        @click="
                            adventurer.talentsData[Step.ARCANE_SPECIALTY].magicSchool = t(
                                `Step.Spellcraft.Magic-schools.${capitalizeFirstLetter(item)}.label`
                            )
                        "
                    >
                        <p>
                            <strong>{{
                                t(`Step.Spellcraft.Magic-schools.${capitalizeFirstLetter(item)}.label`)
                            }}</strong>
                        </p>
                        <p>{{ t(`Step.Spellcraft.Magic-schools.${capitalizeFirstLetter(item)}.description`) }}</p>
                    </div>
                </template>
            </TableCard>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import spellcraftData from '@/assets/data/spellcraft.json';
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

const talent = talentDefinitionsData.find((talent) => talent.id === Step.ARCANE_SPECIALTY)!;
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.school-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

@media (max-width: 768px) {
    .school-item {
        display: flex;
        flex-direction: column;

        overflow: hidden;
        text-overflow: ellipsis;
        * {
            white-space: wrap;
        }
    }
}
</style>
