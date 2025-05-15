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
            <div>TODO: CRIMES INPUTS & TABLE</div>
            <div>TODO: REACTION INPUT & SUGGESTIONS</div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import guildTraitsData from '@/assets/data/guild-traits.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import StepFrame from '../StepFrame.vue';
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
</style>
