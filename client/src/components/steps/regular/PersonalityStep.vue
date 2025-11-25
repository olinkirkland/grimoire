<template>
    <StepFrame>
        <Card class="name">
            <p v-html="t('Step.Personality.Name.instructions')"></p>
            <div class="name-inputs">
                <InputGroup v-model="adventurer.name" :placeholder="t('Step.Personality.Adventurer-name.placeholder')">
                    <span>{{ t('Step.Personality.Adventurer-name.label') }}</span>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.playerName"
                    :placeholder="t('Step.Personality.Player-name.placeholder')"
                >
                    <span>{{ t('Step.Personality.Player-name.label') }}</span>
                </InputGroup>
            </div>
            <NamePicker
                id="adventurer-name"
                :name-tables="nameTablesData"
                :name-category-label-function="(item: string) => t(`Step.Personality.Name.Generator.Tables.${item}`)"
                v-model:name="adventurer.name"
            >
                <p v-html="t('Step.Personality.Name.Generator.instructions')"></p>
            </NamePicker>
        </Card>
        <div class="traits-and-desires">
            <Card class="traits">
                <p v-html="t('Step.Personality.Traits.instructions')"></p>
                <PickList
                    :items="traitsData"
                    v-model:selected-items="adventurer.traits"
                    v-model:not-selected-items="adventurer.notTraits"
                    :label-function="(item: string) => t(`Step.Personality.Traits.${item}`)"
                />
            </Card>
            <Card class="desires">
                <p v-html="t('Step.Personality.Desires.instructions')"></p>
                <PickList
                    :items="desiresData"
                    v-model:selected-items="adventurer.desires"
                    v-model:not-selected-items="adventurer.notDesires"
                    :label-function="(item: string) => t(`Step.Personality.Desires.${item}`)"
                />
            </Card>
        </div>
        <Card class="features">
            <p v-html="t('Step.Personality.Features.instructions')"></p>
            <ul class="features-list">
                <li>
                    <InputGroup
                        v-model="adventurer.features[0]"
                        :placeholder="t('Step.Personality.Features.placeholder-1')"
                        ><span>#1</span>
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.features[1]"
                        :placeholder="t('Step.Personality.Features.placeholder-2')"
                        ><span>#2</span>
                    </InputGroup>
                </li>
                <li>
                    <InputGroup
                        v-model="adventurer.features[2]"
                        :placeholder="t('Step.Personality.Features.placeholder-3')"
                        ><span>#3</span>
                    </InputGroup>
                </li>
            </ul>
            <div class="crucibles">
                <CrucibleCard
                    v-for="(features, key) in featuresData"
                    :items="features"
                    :labelFunction="
                        (item: string) => t(`Step.Personality.Features.Crucibles.${capitalizeFirstLetter(key)}.${item}`)
                    "
                    v-model="adventurer.featuresCrucibles[key]"
                    :key="key"
                    :title="t(`Step.Personality.Features.Crucibles.${key}`)"
                />
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import desiresData from '@/assets/data/desires.json';
import featuresData from '@/assets/data/features.json';
import nameTablesData from '@/assets/data/name-tables.json';
import traitsData from '@/assets/data/traits.json';
import CrucibleCard from '@/components/ui/CrucibleCard.vue';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
</script>

<style scoped lang="scss">
.card.name {
    width: 100%;

    .name-inputs {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        > .input-group {
            width: 100%;
            max-width: 100%;
        }
    }
}

.traits-and-desires {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.card.traits,
.card.desires {
    flex: 1; // Make the cards take equal space
}

.features-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.crucibles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    > * {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .traits-and-desires {
        flex-direction: column;
    }

    .name-inputs {
        grid-template-columns: 1fr !important;
    }

    .features-list {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .crucibles {
        grid-template-columns: 1fr;
    }
}
</style>
