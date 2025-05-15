<template>
    <StepFrame>
        <ReferenceCard :page="70">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Expertise.title`) }}</h3>
                <p v-html="t(`Step.Expertise.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Expertise.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="thieves-guild">
            <p v-html="t('Step.Expertise.Thieves-guild.instructions')"></p>
            <p v-html="t('Step.Expertise.Thieves-guild.picker-instructions')"></p>
            <Card class="thieves-guild-traits">
                <ul class="pick-list">
                    <li v-for="(trait, index) in guildTraitsData" :key="index" @click="onClickCycleTrait(trait)">
                        <i :class="getTraitSelectionClass(trait)"></i>
                        <span>{{ t(`Step.Expertise.Thieves-guild.Table.${trait}`) }}</span>
                    </li>
                </ul>
            </Card>
        </Card>
        <Card class="criminal-history">
            <p v-html="t('Step.Expertise.Crime.instructions')"></p>
            <InputGroup
                v-model="adventurer.talentsData[Step.EXPERTISE].crime"
                :placeholder="t('Step.Expertise.Crime.placeholder')"
            >
                {{ t('Step.Expertise.Crime.label') }}
            </InputGroup>
            <Card class="table-card crime">
                <ul class="table" v-for="(category, categoryKey) in crimeData" :key="categoryKey" :class="categoryKey">
                    <header>
                        <p>{{ t(`Step.Expertise.Crime.${capitalizeFirstLetter(categoryKey)}.label`) }}</p>
                    </header>
                    <li v-for="(part, partKey) in category" :key="partKey">
                        {{ t(`Step.Expertise.Crime.${capitalizeFirstLetter(categoryKey)}.${part}`) }}
                    </li>
                </ul>
            </Card>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import crimeData from '@/assets/data/crime.json';
import guildTraitsData from '@/assets/data/guild-traits.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import StepFrame from '../StepFrame.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function getTraitSelectionClass(trait: string): string {
    if (props.adventurer.talentsData[Step.EXPERTISE].guildTraits.includes(trait)) return 'fas fa-circle';
    return props.adventurer.talentsData[Step.EXPERTISE].notGuildTraits.includes(trait) ? 'fas fa-ban' : 'far fa-circle';
}

function onClickCycleTrait(trait: string) {
    const isInTraits = props.adventurer.talentsData[Step.EXPERTISE].guildTraits.includes(trait);
    const isInNotTraits = props.adventurer.talentsData[Step.EXPERTISE].notGuildTraits.includes(trait);

    // If it's not in traits or notTraits, add it to traits, and return
    if (!isInTraits && !isInNotTraits) {
        props.adventurer.talentsData[Step.EXPERTISE].guildTraits.push(trait);
        return;
    }

    // If it's in traits, remove it from traits, add it to notTraits, and return
    if (isInTraits) {
        props.adventurer.talentsData[Step.EXPERTISE].guildTraits = props.adventurer.talentsData[
            Step.EXPERTISE
        ].guildTraits.filter((t: string) => t !== trait);
        props.adventurer.talentsData[Step.EXPERTISE].notGuildTraits.push(trait);
        return;
    }

    // If it's in notTraits, remove it from notTraits, and return
    if (isInNotTraits) {
        props.adventurer.talentsData[Step.EXPERTISE].notGuildTraits = props.adventurer.talentsData[
            Step.EXPERTISE
        ].notGuildTraits.filter((t: string) => t !== trait);
        return;
    }
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

.card.thieves-guild-traits {
    background-color: var(--overlay);
    padding: 0.4rem;
}

ul.pick-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    > li {
        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-style: italic;

        > span {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.criminal-history {
    .table-card {
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
    }
}

.table-card.crime {
    ul:nth-of-type(3) {
        border-right: none;
    }
    ul > li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

@media (min-width: 768px) {
    ul.table.nature {
        grid-column: -1 / 1;
        border-top: 1px solid var(--surface-border);
        header {
            grid-column: -1 / 1;
        }
    }
}

@media (max-width: 768px) {
    .criminal-history {
        .table-card {
            grid-template-columns: 1fr;
            ul {
                border: none;
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                header {
                    grid-column: 1 / -1;
                }

                &:not(:first-child) {
                    border-top: 1px solid var(--surface-border);
                }
            }
        }
    }
}
</style>
