<template>
    <StepFrame>
        <ReferenceCard :page="14">
            <p v-html="t('Step.Heritage.instructions')"></p>
        </ReferenceCard>
        <Card class="crucible">
            <!-- Folk -->
            <div class="crucible-row">
                <h3>{{ t('Step.Heritage.folk') }}</h3>
                <ul class="grid folk-grid">
                    <li v-for="f in heritageData.folk">
                        <span>{{ t(`Step.Heritage.Folk.${f}`) }}</span>
                    </li>
                </ul>
            </div>
            <!-- Mood -->
            <div class="crucible-row">
                <h3>{{ t('Step.Heritage.mood') }}</h3>
                <ul class="grid heritage-grid">
                    <li v-for="h in heritageData.mood">
                        <span>{{ t(`Step.Heritage.Mood.${h}`) }}</span>
                    </li>
                </ul>
            </div>
            <!-- Land -->
            <div class="crucible-row">
                <h3>{{ t('Step.Heritage.land') }}</h3>
                <ul class="grid heritage-grid">
                    <li v-for="h in heritageData.land">
                        <span>{{ t(`Step.Heritage.Land.${h}`) }}</span>
                    </li>
                </ul>
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import heritageData from '@/assets/data/heritage.json';
import { t } from '@/i18n/locale';
import StepFrame from '../StepFrame.vue';
import Card from '../ui/Card.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.crucible {
    padding: 0;
    width: 100%;
}
.crucible-row {
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    width: 100%;

    &:nth-child(odd) {
        background-color: var(--overlay);
    }

    &:first-child {
        padding-top: 2rem;
    }

    &:last-child {
        padding-bottom: 2rem;
    }

    h3 {
        font-size: 2.4rem;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--surface-alt);
        width: 12rem;
    }

    ul {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        > li {
            padding: 0.2rem 1.2rem;
            font-style: italic;
            * {
                font-size: 1.4rem;
            }
        }
    }
}

@media (max-width: 768px) {
    .crucible-row {
        flex-direction: column;
        gap: 0.4rem;
        h3 {
            width: 100%;
            text-align: center;
            font-size: 1.6rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px dashed var(--surface-border);
        }
        ul {
            grid-template-columns: repeat(3, 1fr);
            > li {
                padding: 0.4rem;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
</style>
