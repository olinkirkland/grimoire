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
            <Card class="song-parts">
                <ul class="table" v-for="(category, categoryKey) in bardsongData" :key="categoryKey">
                    <header>
                        <p>
                            {{ t(`Step.Bardsong.${capitalizeFirstLetter(categoryKey)}.name`) }}
                        </p>
                    </header>
                    <li v-for="(part, partKey) in category" :key="partKey">
                        {{ t(`Step.Bardsong.${capitalizeFirstLetter(categoryKey)}.${part}`) }}
                    </li>
                </ul>
            </Card>
            <div class="song-result">
                <Button @click="onClickRoll">
                    <i class="fas fa-random"></i>
                    {{ t('roll') }}
                </Button>
                <p
                    v-if="chosenStyle >= 0 && chosenTune >= 0 && chosenImpact >= 0"
                    class="song-result-text"
                    v-html="
                        t('Step.Bardsong.template', {
                            style: capitalizeFirstLetter(t(`Step.Bardsong.Style.${bardsongData.style[chosenStyle]}`)),
                            tune: capitalizeFirstLetter(t(`Step.Bardsong.Tune.${bardsongData.tune[chosenTune]}`)),
                            impact: capitalizeFirstLetter(
                                t(`Step.Bardsong.Impact.${bardsongData.impact[chosenImpact]}`)
                            )
                        })
                    "
                ></p>
            </div>
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
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import bardsongData from '@/assets/data/bardsong.json';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { ref } from 'vue';
import StepFrame from '../StepFrame.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';
import bardicInstrumentsData from '@/assets/data/bardic-instruments.json';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const chosenStyle = ref();
const chosenTune = ref();
const chosenImpact = ref();

function onClickRoll() {
    chosenStyle.value = Math.floor(Math.random() * bardsongData.style.length);
    chosenTune.value = Math.floor(Math.random() * bardsongData.tune.length);
    chosenImpact.value = Math.floor(Math.random() * bardsongData.impact.length);
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

@media (max-width: 768px) {
    .card.bardic-instrument {
        grid-template-columns: repeat(1, 1fr);
        header {
            border-top: 1px solid var(--surface-border);
        }
    }
}
</style>
