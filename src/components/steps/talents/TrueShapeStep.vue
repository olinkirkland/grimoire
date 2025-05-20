<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t(`Step.Talents.talent-by-path`, { path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`) }) }}</h2>
                <h3>⬦ {{ t(`Step.True-shape.title`) }}</h3>
                <p v-html="t(`Step.Talents.True-shape.description`)"></p>
            </div>
        </ReferenceCard>
        <Card>
            <InputGroup
                v-model="adventurer.talentsData[Step.TRUE_SHAPE].shape"
                :placeholder="t('Step.True-shape.Shape.placeholder')"
            >
                <span>{{ t('Step.True-shape.Shape.label') }}</span>
            </InputGroup>
            <div class="inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.TRUE_SHAPE].wildTalents[0]"
                    :placeholder="t('Step.True-shape.Wild-talents.placeholder-1')"
                >
                    <span>{{ t('Step.True-shape.Wild-talents.label-1') }}</span>
                </InputGroup>

                <InputGroup
                    v-model="adventurer.talentsData[Step.TRUE_SHAPE].wildTalents[1]"
                    :placeholder="t('Step.True-shape.Wild-talents.placeholder-2')"
                >
                    <span>{{ t('Step.True-shape.Wild-talents.label-2') }}</span>
                </InputGroup>
            </div>
            <p
                v-if="wildTalentCount > 0"
                v-html="t('Step.True-shape.Wild-talents.note', { count: wildTalentCount.toString() })"
            ></p>
        </Card>
        <Card class="wild-talents">
            <p v-html="t('Step.Wild-shape.Wild-talents.instructions')"></p>
            <TableGroup merge>
                <TableCard
                    v-for="wildtalentsDataHalf in [
                        wildTalentsData.slice(0, Math.ceil(wildTalentsData.length / 2)),
                        wildTalentsData.slice(Math.ceil(wildTalentsData.length / 2))
                    ]"
                    :items="wildtalentsDataHalf"
                >
                    <template #item="{ item }">
                        <p>
                            <strong>{{ t(`Step.Wild-shape.Wild-talents.Beasts.${item.beast}`) }}</strong>
                        </p>
                        <!-- The beast talent exists in the talentsData array -->
                        <div
                            v-if="talentsData.find((t) => t.id === item.talent)"
                            class="existing-talent"
                            @click="onClickTalent(item.talent)"
                        >
                            <p class="talent-name">
                                {{ t(`Step.Talents.${capitalizeFirstLetter(item.talent)}.name`) }}
                            </p>
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <!-- The beast talent does not exist in the talentsData array -->
                        <p class="talent-name" v-else>
                            {{ t(`Step.Wild-shape.Wild-talents.Talents.${item.talent}`) }}
                        </p>
                    </template>
                </TableCard>
            </TableGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { default as talentDefinitionsData, default as talentsData } from '@/assets/data/talents.json';
import wildTalentsData from '@/assets/data/wild-talents.json';
import TalentModal from '@/components/modals/templates/TalentModal.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.TRUE_SHAPE)!;

const wildTalentCount = computed(() => {
    return props.adventurer.talentsData[Step.TRUE_SHAPE].wildTalents.filter((t: string) => t.length).length;
});

function onClickTalent(talent: string) {
    ModalController.open(TalentModal, { talent });
}
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

.existing-talent {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;

    i {
        cursor: pointer;
        color: var(--surface-alt);
        font-size: 1.6rem;
    }
}

.talent-name {
    width: auto;
    text-align: right;
    margin-left: auto;
}

@media (max-width: 768px) {
    .inputs {
        grid-template-columns: 1fr;
    }
}
</style>
