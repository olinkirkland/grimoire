<template>
    <StepFrame>
        <ReferenceCard :page="54">
            <p v-html="t('Step.Talents.instructions')"></p>
        </ReferenceCard>
        <Card class="paths">
            <div class="filters">
                <InputGroup :placeholder="t('Step.Talents.search-placeholder')" v-model="searchTerm">
                    <i class="fas fa-search"></i>
                </InputGroup>
                <Button v-if="props.adventurer.path" @click="filterOnlyMyPath = !filterOnlyMyPath">
                    <span v-html="t(`Step.Talents.path-filter-${filterOnlyMyPath ? 'on' : 'off'}`)"></span>
                </Button>
            </div>
            <ul class="talents-list" v-if="filteredTalents.length">
                <li v-for="(talent, index) in filteredTalents" :key="index">
                    <div class="talent-info">
                        <p>{{ t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.name`) }}</p>
                        <p v-html="t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.description`)"></p>
                    </div>
                </li>
            </ul>
            <p class="no-results" v-else>{{ t('Step.Talents.no-results') }}</p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentsData from '@/assets/data/talents.json';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed, ref } from 'vue';
import StepFrame from '../StepFrame.vue';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import InputGroup from '../ui/InputGroup.vue';
import ReferenceCard from '../ui/ReferenceCard.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const searchTerm = ref<string>('');
const filterOnlyMyPath = ref<boolean>(false);

const filteredTalents = computed(() => {
    return talentsData.filter((talent) => {
        // Filter by path if the adventurer has one
        if (filterOnlyMyPath.value && talent.source !== props.adventurer.path) return false;

        // Filter by search term
        if (!searchTerm.value) return true;
        const name = t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.name`).toLowerCase();
        const description = t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.description`).toLowerCase();
        return (
            name.includes(searchTerm.value.toLowerCase()) || // Match name
            description.includes(searchTerm.value.toLowerCase()) || // Match description
            talent.source.toLowerCase().includes(searchTerm.value.toLowerCase()) // Match source
        );
    });
});
</script>

<style scoped lang="scss">
.card.paths {
    width: 100%;
    ul.talents-list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
        gap: 1rem;
        > li .talent-info > p:nth-child(1) {
            font-weight: bold;
        }
    }
}

.filters {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
}

p.no-results {
    font-style: italic;
}

@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
