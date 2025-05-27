<template>
    <StepFrame>
        <ReferenceCard :page="15">
            <p v-html="t('Step.Arcs.instructions')"></p>
        </ReferenceCard>
        <Card glass :class="{ empty: adventurer.arcs.length === 0 }">
            <Card v-for="(arc, index) in adventurer.arcs" class="arc-card" :key="index">
                <header>
                    <p v-html="t('Step.Arcs.arc-name', { index: (index + 1).toString() })"></p>
                    <!-- Remove Bond Button -->
                    <Button @click="removeArc(index)" icon>
                        <i class="fas fa-trash"></i>
                    </Button>
                </header>
                <div class="arc-card__content">
                    <TextAreaGroup v-model="arc.description" :placeholder="t('Step.Arcs.Description.placeholder')">
                    </TextAreaGroup>
                </div>
            </Card>
            <Button @click="onClickAddArc" primary full-width-mobile class="add-arc">
                <i class="fas fa-plus"></i>
                <span>{{ t('Step.Arcs.add') }}</span>
            </Button>
        </Card>
        <Card>
            <p v-html="t('Step.Arcs.advice')"></p>
            <TableGroup>
                <TableCard :title="t('Step.Arcs.Table.ambitions')" :items="arcsData.ambitions">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Arcs.Table.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Arcs.Table.struggles')" :items="arcsData.struggles">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Arcs.Table.${item}`) }}</span>
                    </template>
                </TableCard>
                <TableCard :title="t('Step.Arcs.Table.growth')" :items="arcsData.growth">
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{ t(`Step.Arcs.Table.${item}`) }}</span>
                    </template>
                </TableCard>
            </TableGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import arcsData from '@/assets/data/arcs.json';
import TextAreaGroup from '@/components/ui/TextAreaGroup.vue';
import { t } from '@/i18n/locale';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickAddArc() {
    props.adventurer.arcs.push({ description: '' });
}

function removeArc(index: number) {
    props.adventurer.arcs.splice(index, 1);
}
</script>

<style scoped lang="scss">
button.add-arc {
    margin-left: auto;
}

.empty button.add-arc {
    margin: 0 auto;
}

.card.arc-card {
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
        overflow: hidden;
    }

    > .arc-card__content {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
