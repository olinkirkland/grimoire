<template>
    <StepFrame>
        <ReferenceCard :page="60" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Wild-shape.title`) }}</h3>
                <p v-html="t(`Step.Wild-shape.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong>
                        : {{ t('Step.Wild-shape.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
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
        <Card class="druidic-tells">
            <div class="druidic-tells-instructions">
                <p v-html="t('Step.Wild-shape.Druidic-tells.instructions')"></p>
                <InputGroup
                    v-model="adventurer.talentsData[Step.WILD_SHAPE].druidicTells"
                    :placeholder="t('Step.Wild-shape.Druidic-tells.placeholder')"
                >
                    {{ t('Step.Wild-shape.Druidic-tells.label') }}
                </InputGroup>
            </div>
            <CrucibleCard
                :title="t('Step.Wild-shape.Druidic-tells.Crucible.title')"
                :items="druidicTellsData.map((value) => t(`Step.Wild-shape.Druidic-tells.Crucible.${value}`))"
                v-model="adventurer.talentsData[Step.WILD_SHAPE].druidicTellsCrucible"
            ></CrucibleCard>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import druidicTellsData from '@/assets/data/druidic-tells.json';
import talentsData from '@/assets/data/talents.json';
import wildTalentsData from '@/assets/data/wild-talents.json';
import TalentModal from '@/components/modals/templates/TalentModal.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
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

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
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

.card.druidic-tells {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    > .druidic-tells-instructions {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .crucible {
        width: 100%;
        grid-column: span 1;
    }
}

@media (max-width: 768px) {
    .card.druidic-tells {
        grid-template-columns: 1fr;
        > .druidic-tells-instructions {
            grid-column: span 1;
        }
    }
}
</style>
