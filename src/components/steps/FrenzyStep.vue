<template>
    <StepFrame>
        <ReferenceCard :page="56">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Frenzy.title`) }}</h3>
                <p v-html="t(`Step.Frenzy.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Bardsong.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card>
            <p v-html="t('Step.Frenzy.Frenzy-source.instructions')"></p>
            <Card class="frenzy-source">
                <ul class="pick-list">
                    <li
                        v-for="(frenzySource, index) in frenzySourceData"
                        :key="index"
                        @click="onClickCycleFrenzySource(frenzySource)"
                    >
                        <i :class="getFrenzySourceSelectionClass(frenzySource)"></i>
                        <span>{{ t(`Step.Frenzy.Frenzy-source.${frenzySource}`) }}</span>
                    </li>
                </ul>
            </Card>
        </Card>
        <Card class="scars">
            <p v-html="t('Step.Frenzy.Scars.instructions')"></p>
            <ul class="scars-list">
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[0]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-1')"
                ></InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[1]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-2')"
                ></InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.FRENZY].scars[2]"
                    :placeholder="t('Step.Frenzy.Scars.placeholder-3')"
                ></InputGroup>
            </ul>
            <Card class="table-card">
                <ul class="table many">
                    <li v-for="scar in scarsData" :key="scar">
                        {{ t(`Step.Frenzy.Scars.${scar}`) }}
                    </li>
                </ul>
            </Card>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import frenzySourceData from '@/assets/data/frenzy-source.json';
import scarsData from '@/assets/data/scars.json';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function onClickCycleFrenzySource(frenzySource: string) {
    const isInFrenzySources = props.adventurer.talentsData[Step.FRENZY].frenzySources.includes(frenzySource);
    const isInNotFrenzySources = props.adventurer.talentsData[Step.FRENZY].notFrenzySources.includes(frenzySource);

    // If it's not in frenzySources or notFrenzySources, add it to frenzySources, and return
    if (!isInFrenzySources && !isInNotFrenzySources) {
        props.adventurer.talentsData[Step.FRENZY].frenzySources.push(frenzySource);
        return;
    }

    // If it's in frenzySources, remove it from frenzySources, add it to notFrenzySources, and return
    if (isInFrenzySources) {
        props.adventurer.talentsData[Step.FRENZY].frenzySources = props.adventurer.talentsData[
            Step.FRENZY
        ].frenzySources.filter((f: string) => f !== frenzySource);
        props.adventurer.talentsData[Step.FRENZY].notFrenzySources.push(frenzySource);
        return;
    }

    // If it's in notFrenzySources, remove it from notFrenzySources, and return
    if (isInNotFrenzySources) {
        props.adventurer.talentsData[Step.FRENZY].notFrenzySources = props.adventurer.talentsData[
            Step.FRENZY
        ].notFrenzySources.filter((f: string) => f !== frenzySource);
        return;
    }
}

function getFrenzySourceSelectionClass(frenzySource: string): string {
    if (props.adventurer.talentsData[Step.FRENZY].frenzySources.includes(frenzySource)) return 'fas fa-circle';
    return props.adventurer.talentsData[Step.FRENZY].notFrenzySources.includes(frenzySource)
        ? 'fas fa-ban'
        : 'far fa-circle';
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

.card.frenzy-source {
    width: 100%;
    background-color: var(--overlay);
    padding: 0.4rem;
}

ul.pick-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));

    > li {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 1rem;

        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-style: italic;

        > span {
            width: 100%;
        }
    }
}

.scars-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    ul.pick-list {
        grid-template-columns: repeat(1, 1fr);
    }

    .scars-list {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
}
</style>
