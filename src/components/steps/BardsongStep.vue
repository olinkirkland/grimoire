<template>
    <StepFrame>
        <ReferenceCard :page="54">
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Bardsong.title`) }}</h3>
                <p v-html="t(`Step.Bardsong.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Bardsong.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="song-composition">
            <p v-html="t('Step.Bardsong.instructions')"></p>
            <Card class="song-parts">
                <ul class="table" v-for="(category, categoryKey) in bardsongData" :key="categoryKey">
                    <header>
                        <p>
                            {{ t(`Step.Bardsong.${capitalizeFirstLetter(categoryKey)}.name`) }}
                        </p>
                    </header>
                    <li v-for="(part, partKey) in category" :key="partKey">
                        <span>{{ t(`Step.Bardsong.${capitalizeFirstLetter(categoryKey)}.${part}`) }}</span>
                    </li>
                </ul>
            </Card>
            <p class="song-examples" v-html="t('Step.Bardsong.examples')"></p>
        </Card>
        <Card>
            <p v-html="t('Step.Bardsong.Bardic-instrument.instructions')"></p>
            <Card class="bardic-instrument">
                <ul class="table" v-for="(category, categoryKey) in bardicInstrumentsData" :key="categoryKey">
                    <header>
                        <p>{{ t(`Step.Bardsong.Bardic-instrument.${categoryKey}`) }}</p>
                    </header>
                    <li v-for="(part, partKey) in category" :key="partKey">
                        {{ t(`Step.Bardsong.Bardic-instrument.${part}`) }}
                    </li>
                </ul>
            </Card>
            <InputGroup
                v-model="adventurer.talentsData[Step.BARDSONG].bardicInstrument"
                class="bardic-instrument-input"
                :placeholder="t('Step.Bardsong.Bardic-instrument.placeholder')"
            >
                <i class="fas fa-music"></i>
                <span>{{ t('Step.Bardsong.Bardic-instrument.label') }}</span>
            </InputGroup>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bardicInstrumentsData from '@/assets/data/bardic-instruments.json';
import bardsongData from '@/assets/data/bardsong.json';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import StepFrame from '../StepFrame.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import { Step } from '@/step';

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

.card.song-composition {
    width: 100%;
}

.card.song-parts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    padding: 0;
    gap: 0;
}

.song-result {
    display: flex;
    align-items: center;
    gap: 1rem;

    .song-result-text {
        color: var(--primary);
    }

    .song-result-empty {
        color: var(--surface-alt);
        font-style: italic;
    }
}

.card.bardic-instrument {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
}

.bardic-instrument-input {
    width: 100%;
    max-width: 100%;
}

@media (max-width: 768px) {
    .card.bardic-instrument {
        grid-template-columns: 1fr;

        ul.table {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            header {
                grid-column: 1 / -1;
                border-top: 1px solid var(--surface-border);
            }

            li {
                display: block;
                text-align: left;
                background-color: transparent;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    :deep(.bardic-instrument-input span) {
        display: none;
    }
}
</style>
