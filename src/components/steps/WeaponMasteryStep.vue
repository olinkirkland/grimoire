<template>
    <StepFrame>
        <ReferenceCard :page="62" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Weapon-mastery.title`) }}</h3>
                <p v-html="t(`Step.Weapon-mastery.description`)"></p>
                <ul class="weapon-style">
                    <Card
                        v-for="(style, index) in weaponStylesData"
                        @click="adventurer.talentsData[Step.WEAPON_MASTERY].style = style"
                        :key="index"
                        class="weapon-style-card"
                        :class="{ selected: style === adventurer.talentsData[Step.WEAPON_MASTERY].style }"
                    >
                        <span>{{ t(`Step.Weapon-mastery.Weapon-style.${style}`) }}</span>
                        <em>{{ t(`Step.Weapon-mastery.Weapon-style.fighting-style`) }}</em>
                    </Card>
                </ul>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Weapon-mastery.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="weapon-origin">
            <div class="weapon-origin-instructions">
                <p v-html="t(`Step.Weapon-mastery.Origin.instructions`)"></p>
                <InputGroup
                    :placeholder="t('Step.Weapon-mastery.Origin.placeholder')"
                    v-model="adventurer.talentsData[Step.WEAPON_MASTERY].origin"
                >
                    {{ t('Step.Weapon-mastery.Origin.label') }}
                </InputGroup>
            </div>
            <CrucibleCard
                :title="t('Step.Weapon-mastery.Origin.title')"
                :items="weaponOriginData.map((value) => t(`Step.Weapon-mastery.Origin.Crucible.${value}`))"
                v-model="adventurer.talentsData[Step.WEAPON_MASTERY].originCrucible"
            ></CrucibleCard>
        </Card>
        <Card class="weapon-knowledge">
            <p v-html="t(`Step.Weapon-mastery.Weapon-knowledge.instructions`)"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import weaponOriginData from '@/assets/data/weapon-origin.json';
import weaponStylesData from '@/assets/data/weapon-styles.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import StepFrame from '../StepFrame.vue';
import CrucibleCard from '../ui/CrucibleCard.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
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

.card.weapon-origin {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    > .weapon-origin-instructions {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .crucible {
        width: 100%;
        grid-column: span 1;
    }
}

ul.weapon-style {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    .card {
        cursor: pointer;
        box-shadow: var(--shadow-sm);
        align-items: center;
        gap: 0;
        transition: box-shadow 0.2s ease-in-out;

        > em {
            font-size: 1.2rem;
            color: var(--surface-alt);
        }

        &.selected {
            transition: none;
            box-shadow: none;
            background-color: var(--primary-light);
            color: var(--primary-alt);
            > em {
                color: var(--primary);
                opacity: 0.6;
            }
        }
    }
}

@media (max-width: 768px) {
    .card.weapon-origin {
        grid-template-columns: 1fr;
        > .weapon-origin-instructions {
            grid-column: span 1;
        }
    }

    ul.weapon-style {
        grid-template-columns: 1fr;
    }
}
</style>
