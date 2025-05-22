<template>
    <StepFrame>
        <ReferenceCard :page="14">
            <p v-html="t('Step.Stats.instructions')"></p>
        </ReferenceCard>
        <Card glass>
            <p class="full-width text-center">
                {{ t('Step.Stats.points-used', { points: totalPointsUsedCount, max: maxPoints.toString() }) }}
            </p>
        </Card>
        <Card class="stat">
            <ul class="stat-list">
                <li v-for="(statKey, index) in Object.keys(adventurer.stats)" :key="index">
                    <Card class="stat-card">
                        <Button @click="onClickChangeStat(statKey, -1)" :disabled="getStatValue(statKey) <= 1">
                            <i class="fas fa-minus"></i>
                        </Button>

                        <div>
                            <h2>{{ getStatValue(statKey) }}</h2>
                            <p>{{ getStatName(statKey) }}</p>
                            <p>{{ getStatDescription(statKey) }}</p>
                        </div>

                        <!-- 3 is the max points for a stat -->
                        <Button
                            @click="onClickChangeStat(statKey, 1)"
                            :disabled="getStatValue(statKey) >= 3 || reachedMaxPoints"
                        >
                            <i class="fas fa-plus"></i>
                        </Button>
                    </Card>
                </li>
            </ul>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { getTalentTemplate, Modify } from '@/utils/adventurer-util';
import { capitalizeFirstLetter } from '@/utils/string-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const maxPoints = computed(() => {
    let points = 4;
    // Check for Modify.STATS values in added talents
    props.adventurer.talents.forEach((talent) => {
        // Get the talent template
        const template = getTalentTemplate(talent);
        if (template) {
            // Check if the talent has a Modify.STATS value
            if (template[Modify.STATS]) {
                // Add the value to the starting max points
                points += template[Modify.STATS];
            }
        }
    });

    return points;
});

const getStatValue = (statKey: string) => {
    return props.adventurer.stats[statKey as keyof Adventurer['stats']];
};

const getStatName = (statKey: string) => {
    return t(`Step.Stats.${capitalizeFirstLetter(statKey)}.name`);
};

const getStatDescription = (statKey: string) => {
    return t(`Step.Stats.${capitalizeFirstLetter(statKey)}.description`);
};

const totalPointsUsedCount = computed(() => {
    const totalPointsUsed = Object.values(props.adventurer.stats).reduce((acc, stat) => acc + stat, 0);
    return `${totalPointsUsed - 4}`; // 4 is the base points (1 for each stat)
});

const reachedMaxPoints = computed(() => {
    const totalPointsUsed = Object.values(props.adventurer.stats).reduce((acc, stat) => acc + stat, 0);
    return totalPointsUsed >= maxPoints.value + 4; // 4 is the base points (1 for each stat)
});

function onClickChangeStat(statKey: string, change: number) {
    const stat = props.adventurer.stats[statKey as keyof Adventurer['stats']];
    console.log(stat, change);
    if (stat + change < 0 || stat + change >= maxPoints.value) return;
    props.adventurer.stats[statKey as keyof Adventurer['stats']] += change;
}
</script>

<style scoped lang="scss">
.card.stat {
    width: 100%;
}

ul.stat-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    > li .card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        > div {
            display: flex;
            flex-direction: column;
            text-align: center;
            > h2 {
                font-size: 4rem;
                color: var(--surface-alt);
                font-weight: bold;
                text-align: center;
            }
            > p:nth-of-type(1) {
                font-size: 2.4rem;
                color: var(--surface-alt);
                text-transform: uppercase;
                font-weight: bold;
            }
        }
    }
}

@media (max-width: 768px) {
    .card.stat {
        padding: 0;
    }

    ul.stat-list {
        grid-template-columns: 1fr;
        gap: 0;

        > li .card {
            border: none;
            background-color: none;
            border-radius: 0;
        }

        > li:nth-child(odd) > .card {
            background-color: var(--overlay);
        }
    }
}
</style>
