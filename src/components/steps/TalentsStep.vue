<template>
    <StepFrame>
        <ReferenceCard :page="54">
            <p v-html="t('Step.Talents.instructions')"></p>
        </ReferenceCard>
        <Card glass>
            <ul class="added-talents">
                <li v-for="(talent, index) in props.adventurer.talents" :key="index">
                    <Card>
                        <div class="added-talent-info">
                            <h3>{{ t(`Step.Talents.${capitalizeFirstLetter(talent)}.name`) }}</h3>
                            <Button @click="props.adventurer.talents.splice(index, 1)">
                                <i class="fas fa-times"></i>
                                <span>{{ t('Step.Talents.remove') }}</span>
                            </Button>
                        </div>
                    </Card>
                </li>
            </ul>
        </Card>
        <Card class="talents">
            <div class="filters">
                <InputGroup :placeholder="t('Step.Talents.search-placeholder')" v-model="searchTerm">
                    <i class="fas fa-search"></i>
                </InputGroup>
                <ButtonBar v-if="props.adventurer.path">
                    <Button @click="filterOnlyMyPath = true" :pressed="filterOnlyMyPath">
                        <span
                            v-html="
                                t('Step.Talents.filter-by-path', {
                                    path: t(`Step.Path.${capitalizeFirstLetter(props.adventurer.path)}.name`)
                                })
                            "
                        ></span>
                    </Button>
                    <Button @click="filterOnlyMyPath = false" :pressed="!filterOnlyMyPath">
                        <span v-html="t('Step.Talents.filter-all-paths')"></span>
                    </Button>
                </ButtonBar>
            </div>
            <Card class="filtered-talents">
                <ul class="talents-list" v-if="filteredTalents.length">
                    <li v-for="(talent, index) in filteredTalents" :key="index">
                        <div class="talent-info">
                            <header>
                                <h3>{{ t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.name`) }}</h3>
                                <Button
                                    :disabled="adventurer.talents.includes(talent.id)"
                                    @click="adventurer.talents.push(talent.id)"
                                >
                                    <i v-if="adventurer.talents.includes(talent.id)" class="fas fa-check"></i>
                                    <i v-else class="fas fa-plus"></i>
                                    <span v-if="adventurer.talents.includes(talent.id)">
                                        {{ t('Step.Talents.added') }}
                                    </span>
                                    <span v-else>{{ t('Step.Talents.add') }}</span>
                                </Button>
                            </header>
                            <p v-html="t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.description`)"></p>
                        </div>
                    </li>
                </ul>
                <p class="no-results" v-else>{{ t('Step.Talents.no-results') }}</p>
            </Card>
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
import ButtonBar from '../ui/ButtonBar.vue';
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
const filterOnlyMyPath = ref<boolean>(props.adventurer.path ? true : false);

const filteredTalents = computed(() => {
    return talentsData
        .filter((talent) => {
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
        })
        .sort((a, b) => {
            // Sort by name
            const nameA = t(`Step.Talents.${capitalizeFirstLetter(a.id)}.name`).toLowerCase();
            const nameB = t(`Step.Talents.${capitalizeFirstLetter(b.id)}.name`).toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
});
</script>

<style scoped lang="scss">
.card.talents {
    width: 100%;

    ul.talents-list {
        width: 100%;
        display: flex;
        flex-direction: column;

        > li {
            width: 100%;
            padding: 0.8rem;

            header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            &:nth-child(odd) {
                background-color: var(--overlay);
            }
        }

        > li .talent-info > h3 {
            margin-bottom: 0.4rem;
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
    padding: 1.6rem;
    font-style: italic;
}

.card.filtered-talents {
    width: 100%;
    padding: 0;
}

ul.added-talents {
    width: 100%;
    display: flex;
    overflow-x: auto;
    gap: 1rem;
}

@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
