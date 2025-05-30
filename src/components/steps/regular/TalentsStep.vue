<template>
    <StepFrame>
        <ReferenceCard :page="54">
            <p v-html="t('Step.Talents.instructions')"></p>
        </ReferenceCard>
        <Card glass class="added-talents">
            <ul class="talents-list">
                <p v-if="!props.adventurer.talents.length" class="no-results">
                    {{ t('Step.Talents.no-added-talents') }}
                </p>
                <li v-else v-for="(talent, index) in props.adventurer.talents" :key="index">
                    <Card>
                        <div class="talent-info">
                            <header>
                                <i class="fas fa-info-circle" @click="onClickTalent(talent)"></i>
                                <h3>{{ t(`Step.Talents.${capitalizeFirstLetter(talent)}.name`) }}</h3>
                                <Button @click="onClickRemoveTalent(index, talent)" primary>
                                    <i class="fas fa-trash"></i>
                                    <span>{{ t('Step.Talents.remove') }}</span>
                                </Button>
                            </header>
                            <h2>{{ getSourceLabel(talentsData.find((t) => t.id === talent)!.source) }}</h2>
                        </div>
                    </Card>
                </li>
            </ul>
        </Card>
        <Card class="talents">
            <div class="filters">
                <div class="search-container">
                    <InputGroup :placeholder="t('Step.Talents.search-placeholder')" v-model="searchTerm" class="search">
                        <i class="fas fa-search"></i>
                    </InputGroup>
                </div>
                <ButtonBar v-if="props.adventurer.path && props.adventurer.path !== 'adventurer'">
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
            <Card class="filtered-talents" v-if="filteredTalents.length">
                <ul class="talents-list">
                    <li v-for="(talent, index) in filteredTalents" :key="index">
                        <div class="talent-info">
                            <header>
                                <h3>{{ t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.name`) }}</h3>
                                <Button
                                    :disabled="adventurer.talents.includes(talent.id)"
                                    @click="onClickAddTalent(talent.id)"
                                >
                                    <i v-if="adventurer.talents.includes(talent.id)" class="fas fa-check"></i>
                                    <i v-else class="fas fa-plus"></i>
                                    <span v-if="adventurer.talents.includes(talent.id)">
                                        {{ t('Step.Talents.added') }}
                                    </span>
                                    <span v-else>{{ t('Step.Talents.add') }}</span>
                                </Button>
                            </header>
                            <h2>{{ getSourceLabel(talent.source) }}</h2>
                            <p v-html="t(`Step.Talents.${capitalizeFirstLetter(talent.id)}.description`)"></p>
                        </div>
                    </li>
                </ul>
            </Card>
            <p class="no-results" v-else>{{ t('Step.Talents.no-results') }}</p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentsData from '@/assets/data/talents.json';
import TalentModal from '@/components/modals/templates/TalentModal.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { getTalentTemplate } from '@/utils/adventurer-util';
import { capitalizeFirstLetter } from '@/utils/string-util';
import { computed, ref } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const searchTerm = ref<string>('');
const filterOnlyMyPath = ref<boolean>(!!props.adventurer.path && props.adventurer.path !== 'adventurer');

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

function getSourceLabel(source: string): string {
    const path = t(`Step.Path.${capitalizeFirstLetter(source)}.name`);
    return t('Step.Talents.talent-by-path', { path });
}

function onClickTalent(talent: string) {
    ModalController.open(TalentModal, { talent });
}

function onClickAddTalent(talent: string) {
    props.adventurer.talents.push(talent);
    const talentTemplate = getTalentTemplate(talent);
    if (talentTemplate) props.adventurer.talentsData[talent] = talentTemplate;
}

function onClickRemoveTalent(index: number, talent: string) {
    props.adventurer.talents.splice(index, 1);
    delete props.adventurer.talentsData[talent];
}
</script>

<style scoped lang="scss">
.card.talents {
    width: 100%;
}

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
            gap: 1rem;

            > h3 {
                margin-bottom: 0;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        h2 {
            font-style: italic;
            font-size: 1.4rem;
            color: var(--surface-alt);
            margin-top: -0.4rem;
            margin-bottom: 0.8rem;
        }

        &:nth-child(odd) {
            background-color: var(--overlay);
        }
    }
}

.added-talents ul.talents-list > li {
    .card {
        background-color: var(--primary-light);
        border: 1px solid var(--surface-border);
        box-shadow: var(--shadow-sm);

        h3,
        h2,
        p {
            color: var(--primary-alt);
        }

        h2 {
            font-size: 1.4rem;
            color: var(--primary);
            font-style: italic;
            margin-top: -0.4rem;
            margin-bottom: 0.8rem;
        }
    }
}

.filters {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    .search-container {
        flex: 1;
        width: 100%;
    }
}

p.no-results {
    font-style: italic;
}

.card.filtered-talents {
    width: 100%;
    padding: 0;
}

.card.added-talents {
    width: 100%;

    ul.talents-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
        gap: 1rem;
        height: min-content;
        > li {
            padding: 0;
            height: 100%;
            .card {
                height: 100%;
                width: 100%;
                .talent-info {
                    width: 100%;
                }
                header {
                    display: flex;
                    gap: 0.6rem;
                    > i {
                        position: relative;
                        top: 0.75rem;
                        color: var(--primary-alt);
                        font-size: 1.4rem;
                        cursor: pointer;
                    }
                    > h3 {
                        width: 100%;
                        white-space: nowrap;
                    }
                    button {
                        margin-left: auto;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        align-items: flex-start;
    }

    // Hide the description from added talents
    .card.added-talents {
        > ul.talents-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow: hidden;
            > li {
                width: 100%;
                max-width: 100%;
                > .card {
                    overflow: hidden;
                    > .talent-info {
                        width: 100%;
                        overflow: hidden;
                        > header {
                            width: 100%;
                            margin-top: 0.2rem;
                            gap: 1rem;
                            > h3 {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            button:deep(span) {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
