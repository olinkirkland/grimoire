<template>
    <StepFrame>
        <ReferenceCard :page="51">
            <p v-html="t('Step.Heritage.instructions')"></p>
        </ReferenceCard>
        <Card class="heritage-and-wises">
            <section>
                <InputGroup v-model="adventurer.heritage.name" :placeholder="t('Step.Heritage.placeholder')">
                    <span>{{ t('Step.Heritage.label') }}</span>
                </InputGroup>
                <div class="crucible-cards">
                    <CrucibleCard
                        :items="heritagesData.folk"
                        :labelFunction="(item: string) => t(`Step.Heritage.Folk.${item}`)"
                        v-model="adventurer.heritageCrucibles.folk"
                        :title="t('Step.Heritage.folk')"
                    />
                    <CrucibleCard
                        :items="heritagesData.mood"
                        :labelFunction="(item: string) => t(`Step.Heritage.Mood.${item}`)"
                        v-model="adventurer.heritageCrucibles.mood"
                        :title="t('Step.Heritage.mood')"
                    />
                    <CrucibleCard
                        :items="heritagesData.land"
                        :labelFunction="(item: string) => t(`Step.Heritage.Land.${item}`)"
                        v-model="adventurer.heritageCrucibles.land"
                        :title="t('Step.Heritage.land')"
                    />
                </div>
            </section>

            <section>
                <p v-html="t('Step.Heritage.Wises.instructions')"></p>
                <ul class="wises">
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[0]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-1')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[1]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-2')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer.heritage.wises[2]"
                            :placeholder="t('Step.Heritage.Wises.placeholder-3')"
                        >
                        </InputGroup>
                    </li>
                </ul>
            </section>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import heritagesData from '@/assets/data/heritages.json';
import { t } from '@/i18n/locale';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.heritage-and-wises {
    width: 100%;
    .input-group {
        width: 100%;
        max-width: 100%;
    }

    > section:not(:last-child) {
        margin-bottom: 0.8rem;
    }
}

.wises {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.crucible {
    padding: 0;
    width: 100%;
    gap: 0;
}

.crucible-row {
    display: flex;
    padding: 1.6rem 2rem;
    width: 100%;

    header {
        width: 12rem;
    }

    &:nth-of-type(odd) {
        background-color: var(--overlay);
    }

    &:first-child {
        padding-top: 2rem;
    }

    &:last-child {
        padding-bottom: 2rem;
    }

    ul {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        > li {
            padding: 0.2rem 1.2rem;
            font-style: italic;
            cursor: pointer;

            &.selected > span {
                color: var(--surface-alt);
            }
        }
    }
}

.crucible-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > .card {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .wises {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .crucible-cards {
        grid-template-columns: 1fr;
    }
}
</style>
