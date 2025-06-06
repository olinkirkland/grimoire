<template>
    <StepFrame>
        <ReferenceCard :page="56" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Frenzy.title`) }}</h3>
                <p v-html="t(`Step.Frenzy.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Frenzy.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card>
            <p v-html="t('Step.Frenzy.Frenzy-source.instructions')"></p>
            <PickList
                :items="frenzySourceData"
                v-model:selected-items="adventurer.talentsData[Step.FRENZY].frenzySources"
                v-model:not-selected-items="adventurer.talentsData[Step.FRENZY].notFrenzySources"
                :label-function="(frenzySource: string) => t(`Step.Frenzy.Frenzy-source.${frenzySource}`)"
            />
        </Card>
        <Card class="scars">
            <p v-html="t('Step.Frenzy.Scars.instructions')"></p>
            <ul class="scars-inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[0]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-1')"
                >
                    <template #append>
                        <Button @click="onClickRandomizeScar(0)">
                            <i class="fas fa-random"></i>
                        </Button>
                    </template>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[1]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-2')"
                >
                    <template #append>
                        <Button @click="onClickRandomizeScar(1)">
                            <i class="fas fa-random"></i>
                        </Button>
                    </template>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[2]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-3')"
                >
                    <template #append>
                        <Button @click="onClickRandomizeScar(2)">
                            <i class="fas fa-random"></i>
                        </Button>
                    </template>
                </InputGroup>
            </ul>
            <TableCard :title="t('Step.Frenzy.Scars.title')" :items="scarsData" :many="true">
                <template #item="{ item }">
                    <span class="text-center">{{ t(`Step.Frenzy.Scars.${item}`) }}</span>
                </template>
            </TableCard>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import frenzySourceData from '@/assets/data/frenzy-source.json';
import scarsData from '@/assets/data/scars.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickRandomizeScar(index: number) {
    const randomScar = scarsData[Math.floor(Math.random() * scarsData.length)];
    props.adventurer.talentsData[Step.FRENZY].scars[index] = t(`Step.Frenzy.Scars.${randomScar}`);
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

.scars-inputs {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .scars-inputs {
        grid-template-columns: 1fr;
    }
}
</style>
