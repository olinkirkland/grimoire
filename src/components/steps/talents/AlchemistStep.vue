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
                <h3>⬥ {{ t(`Step.Alchemist.title`) }}</h3>
                <p v-html="t(`Step.Talents.Alchemist.description`)"></p>
            </div>
        </ReferenceCard>

        <!-- All added theorems -->
        <!-- Only allow theorems to be removed if they were added to the alchemist talentData object -->
        <!-- This way, theorems added from the Spellcraft core talent can't be removed here -->
        <Card glass class="added-theorems-card">
            <ul
                v-if="
                    adventurer.talentsData[Step.ALCHEMIST].theorems.length ||
                    adventurer.talentsData[Step.SPELLCRAFT]?.theorems.length
                "
            >
                <Card
                    v-if="adventurer.talentsData[Step.SPELLCRAFT]?.theorems.length"
                    v-for="(theorem, index) in adventurer.talentsData[Step.SPELLCRAFT].theorems"
                    @click="onClickGoToSpellcraft"
                    @mouseover="
                        TooltipController.open(InfoTooltip, {
                            target: $event.currentTarget,
                            html: t('Step.Alchemist.spellcraft-tooltip')
                        })
                    "
                    class="spellcraft-card"
                >
                    <div>
                        <h3 class="ellipsis">{{ theorem.name }}</h3>
                        <p>{{ getMagicSchoolLabel(theorem.magicSchool) }}</p>
                    </div>
                </Card>
                <Card v-for="(theorem, index) in adventurer.talentsData[Step.ALCHEMIST].theorems" class="added-theorem">
                    <div>
                        <h3 class="ellipsis">{{ theorem.name }}</h3>
                        <p>{{ getMagicSchoolLabel(theorem.magicSchool) }}</p>
                    </div>
                    <Button @click="onClickRemoveTheorem(index)">
                        <i class="fas fa-trash"></i>
                    </Button>
                </Card>
            </ul>
            <p v-else>
                <em>{{ t('Step.Spellcraft.Theorems.empty') }}</em>
            </p>
            <p
                v-if="adventurer.talentsData[Step.ARCANE_SPECIALTY]?.magicSchool"
                class="specialty-note"
                v-html="
                    t('Step.Spellcraft.specialty', {
                        school: adventurer.talentsData[Step.ARCANE_SPECIALTY].magicSchool
                    })
                "
            ></p>
        </Card>

        <Card class="theorem-creation">
            <p v-html="t('Step.Alchemist.instructions')"></p>
            <div class="theorem-inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.ALCHEMIST].builder.theorem"
                    :placeholder="t('Step.Spellcraft.Theorems.Name.placeholder')"
                >
                    {{ t('Step.Alchemist.recipe-label') }}
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.ALCHEMIST].builder.magicSchool"
                    :placeholder="t('Step.Spellcraft.Theorems.Magic-school.placeholder')"
                >
                    {{ t('Step.Spellcraft.Theorems.Magic-school.label') }}
                </InputGroup>
                <Button primary @click="onClickAddTheorem" :disabled="!isValidTheorem">
                    <i class="fas fa-plus"></i>
                    <span>{{ t('Step.Spellcraft.Theorems.Add.label') }}</span>
                </Button>
            </div>
            <div class="crucibles">
                <CrucibleCard
                    :title="t('Step.Spellcraft.Style.label')"
                    :items="spellcraftData.style"
                    :label-function="(item: string) => t(`Step.Spellcraft.Crucible.${item}`)"
                    v-model="adventurer.talentsData[Step.ALCHEMIST].spellCrucibles.style"
                />
                <CrucibleCard
                    :title="t('Step.Spellcraft.Essence.label')"
                    :items="spellcraftData.essence"
                    :label-function="(item: string) => t(`Step.Spellcraft.Crucible.${item}`)"
                    v-model="adventurer.talentsData[Step.ALCHEMIST].spellCrucibles.essence"
                />
                <CrucibleCard
                    :title="t('Step.Spellcraft.Form.label')"
                    :items="spellcraftData.form"
                    :label-function="(item: string) => t(`Step.Spellcraft.Crucible.${item}`)"
                    v-model="adventurer.talentsData[Step.ALCHEMIST].spellCrucibles.form"
                />
            </div>

            <TableCard :title="t('Step.Spellcraft.Magic-schools.label')" :items="spellcraftData.magicSchools">
                <template #item="{ item }">
                    <div
                        class="school-item"
                        @click="
                            adventurer.talentsData[Step.ALCHEMIST].builder.magicSchool = t(
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
import InfoTooltip from '@/components/tooltips/templates/InfoTooltip.vue';
import TooltipController from '@/controllers/tooltip-controller';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    },
    changeStep: {
        type: Function as unknown as () => (step: string) => void,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.ALCHEMIST)!;

const currentTheorem = computed(() => {
    return {
        name: props.adventurer.talentsData[Step.ALCHEMIST].builder.theorem,
        magicSchool: props.adventurer.talentsData[Step.ALCHEMIST].builder.magicSchool
    };
});

const isValidTheorem = computed(() => {
    return (
        props.adventurer.talentsData[Step.ALCHEMIST].builder.theorem &&
        props.adventurer.talentsData[Step.ALCHEMIST].builder.magicSchool
    );
});

function onClickGoToSpellcraft() {
    TooltipController.close();
    props.changeStep(Step.SPELLCRAFT);
}

function getMagicSchoolLabel(magicSchool: string) {
    const specialty = props.adventurer.talentsData[Step.ARCANE_SPECIALTY]?.magicSchool;
    if (!specialty || magicSchool === specialty) return `${magicSchool}`;
    return `${magicSchool}, ${specialty}`;
}

function onClickAddTheorem() {
    if (isValidTheorem.value) {
        props.adventurer.talentsData[Step.ALCHEMIST].theorems.push(currentTheorem.value);
        props.adventurer.talentsData[Step.ALCHEMIST].builder.theorem = '';
        props.adventurer.talentsData[Step.ALCHEMIST].builder.magicSchool = '';
    }
}

function onClickRemoveTheorem(index: number) {
    if (index > -1) props.adventurer.talentsData[Step.ALCHEMIST].theorems.splice(index, 1);
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.crucibles {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > * {
        width: 100%;
    }
}

.school-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.theorem-inputs {
    width: 100%;
    display: flex;
    gap: 1rem;
    > .input-group {
        flex: 1;
    }
}

.added-theorems-card ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > .card {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        gap: 1rem;
        box-shadow: var(--shadow-sm);

        > div {
            flex: 1;
            overflow: hidden;
            > h3 {
                font-size: 1.6rem;
            }
            > p {
                margin-top: -0.4rem;
                font-style: italic;
                color: var(--surface-alt);
            }
        }
    }
}

.specialty-note {
    font-size: 1.4rem;
    opacity: 0.6;
}

.spellcraft-card {
    cursor: pointer;
    box-shadow: none !important;
    opacity: 0.8;
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

    .theorem-inputs {
        flex-direction: column;
        > .input-group {
            flex: unset;
        }
        :deep(button > .btn__content) {
            justify-content: center;
        }
    }

    .crucibles {
        grid-template-columns: 1fr;
    }

    .added-theorems-card ul {
        grid-template-columns: 1fr;
    }
}
</style>
