<template>
    <StepFrame>
        <ReferenceCard :page="14">
            <p v-html="t('Step.Bonds.instructions')"></p>
        </ReferenceCard>
        <Card glass class="bonds">
            <Card class="bond-card" v-for="(bond, index) in adventurer.bonds" :key="index">
                <header>
                    <p v-html="t('Step.Bonds.bond-with', { name: bond.name || '...' })"></p>
                    <!-- Remove Bond Button -->
                    <Button @click="removeBond(index)" class="remove-bond" icon>
                        <i class="fas fa-trash"></i>
                    </Button>
                </header>
                <div class="bond-card__content">
                    <div class="inputs">
                        <!-- Name -->
                        <InputGroup v-model="bond.name" :placeholder="t('Step.Bonds.Name.placeholder')">
                            <span>{{ t('Step.Bonds.Name.label') }}</span>
                        </InputGroup>

                        <!-- Intensity -->
                        <InputGroup v-model="bond.intensity" :placeholder="t('Step.Bonds.Intensity.placeholder')">
                            <span>{{ t('Step.Bonds.Intensity.label') }}</span>
                        </InputGroup>

                        <!-- Nature -->
                        <InputGroup v-model="bond.nature" :placeholder="t('Step.Bonds.Nature.placeholder')">
                            <span>{{ t('Step.Bonds.Nature.label') }}</span>
                        </InputGroup>
                    </div>
                    <TextAreaGroup v-model="bond.description" :placeholder="t('Step.Bonds.Description.placeholder')">
                        <span>{{ t('Step.Bonds.Description.label') }}</span>
                    </TextAreaGroup>
                </div>
            </Card>
            <Button @click="onClickAddBond" primary full-width-mobile class="add-bond">
                <i class="fas fa-plus"></i>
                <span>{{ t('Step.Bonds.add') }}</span>
            </Button>
        </Card>
        <Card>
            <p v-html="t('Step.Bonds.advice')"></p>
            <TableGroup>
                <TableCard :title="t('Step.Bonds.Intensity.label')" :items="bondsData.intensity">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bonds.Intensity.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Bonds.Nature.label')" :items="bondsData.nature">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Bonds.Nature.${item}`) }}</span>
                    </template>
                </TableCard>
            </TableGroup>
            <p v-html="t('Step.Bonds.examples')"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bondsData from '@/assets/data/bonds.json';
import TextAreaGroup from '@/components/ui/TextAreaGroup.vue';
import { t } from '@/i18n/locale';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickAddBond() {
    props.adventurer.bonds.push({ name: '', intensity: '', nature: '', description: '' });
}

function removeBond(index: number) {
    props.adventurer.bonds.splice(index, 1);
}
</script>

<style scoped lang="scss">
.card.bond-card {
    padding: 0;
    gap: 0;
    header {
        width: 100%;
        height: 3.2rem;
        padding-left: 1rem;
        padding-right: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--overlay);
        border-bottom: 1px dashed var(--surface-border);
    }

    > .bond-card__content {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        > .inputs {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
    }
}

button.add-bond {
    margin-left: auto;
}

@media (max-width: 768px) {
    .card.bond-card > .bond-card__content > .inputs {
        grid-template-columns: 1fr;
    }
}
</style>
