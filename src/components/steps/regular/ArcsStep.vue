<template>
    <StepFrame>
        <ReferenceCard :page="15">
            <p v-html="t('Step.Arcs.instructions')"></p>
        </ReferenceCard>
        <Card glass>
            <TextAreaGroup
                v-for="(arc, index) in adventurer.arcs"
                v-model="arc.description"
                :placeholder="t('Step.Arcs.Description.placeholder')"
                :key="index"
            >
                <span>{{ t('Step.Arcs.Description.label') }}</span>
                <Button @click="removeArc(index)" class="remove-arc" icon mini>
                    <i class="fas fa-trash"></i>
                </Button>
            </TextAreaGroup>
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
import TextAreaGroup from '@/components/ui/TextAreaGroup.vue';
import { t } from '@/i18n/locale';
import arcsData from '@/assets/data/arcs.json';

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
button.remove-arc {
    margin-left: auto;
}

button.add-arc {
    margin-left: auto;
}
</style>
