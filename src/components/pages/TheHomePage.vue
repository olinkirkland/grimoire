<template>
    <div class="page">
        <div class="page__content" :class="{ center: displayedAdventurers.length === 0 }">
            <h1 class="logo">{{ t('Brand.name') }}</h1>
            <Card class="hero">
                <div class="logo-header">
                    <h2
                        v-html="
                            t('Brand.tagline', {
                                url: 'https://www.drivethrurpg.com/en/product/508618/grimwild?affiliate_id=4237062'
                            })
                        "
                    ></h2>
                </div>

                <div class="controls">
                    <Button primary @click="onClickNewAdventurer">
                        <i class="fas fa-plus-circle"></i>
                        <span> {{ t('Home.new-adventurer') }} </span>
                    </Button>
                    <Button @click="onClickSettings">
                        <i class="fas fa-cog"></i>
                    </Button>
                </div>

                <Card class="adventurers" v-if="displayedAdventurers.length > 0">
                    <ul class="adventurers-list">
                        <li
                            v-for="adventurer in displayedAdventurers"
                            :key="adventurer.id"
                            @click="onClickAdventurer(adventurer)"
                        >
                            <i class="fas fa-user"></i>
                            <span>{{ adventurer.name }}</span>
                            <em v-if="adventurer.path" class="muted">{{
                                t(`Step.Path.${capitalizeFirstLetter(adventurer.path)}.name`)
                            }}</em>
                        </li>
                    </ul>
                </Card>
            </Card>
        </div>
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import Button from '@/components/ui/Button.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { useAdventurersStore } from '@/store/adventurers-store';
import { trackEvent } from '@/tracker';
import { capitalizeFirstLetter, getUniqueName } from '@/utils/naming-util';
import { onMounted, ref } from 'vue';
import AppSettingsModal from '../modals/templates/AppSettingsModal.vue';
import TheFooter from '../TheFooter.vue';
import Card from '../ui/Card.vue';

const adventurersStore = useAdventurersStore();
const displayedAdventurers = ref<Adventurer[]>([]);

onMounted(updateDisplayedAdventurers);

function updateDisplayedAdventurers() {
    // Update displayedAdventurers with the adventurers from the store
    displayedAdventurers.value = [...adventurersStore.adventurers].sort((a, b) => {
        // Sort by last modified date (most recent first)
        return b.updatedAt - a.updatedAt;
    });
}

function onClickNewAdventurer() {
    const newAdventurer = new Adventurer(
        getUniqueName(
            adventurersStore.adventurers.map((adventurer) => adventurer.name),
            t('Home.new-adventurer-name')
        )
    );

    adventurersStore.addAdventurer(newAdventurer);

    // Open the new adventurer in the editor
    router.push({
        name: PageName.ADVENTURER,
        params: { id: newAdventurer.id }
    });

    trackEvent('new-adventurer');
}

function onClickSettings() {
    ModalController.open(AppSettingsModal);
}

function onClickAdventurer(adventurer: Adventurer) {
    router.push({
        name: PageName.ADVENTURER,
        params: { id: adventurer.id }
    });
}
</script>

<style lang="scss" scoped>
.page {
    gap: 0;
    padding: 0;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
    scrollbar-width: none;
}

.page__content {
    width: 100%;
    min-height: 100%;

    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    &.center {
        justify-content: center; // Override the default flex-start on mobile
    }
}

.card.hero {
    width: unset;
    box-shadow: var(--shadow-sm);
    border-radius: 5px;
    padding: 2rem;
    gap: 1.2rem;
    > .logo-header > h1 {
        margin-bottom: 1.2rem;
    }
}

.card.adventurers {
    padding: 0;
    max-width: 64rem;
    min-width: 40rem;
    width: 100%;
}

ul.adventurers-list {
    display: flex;
    flex-direction: column;
    max-height: 24rem;
    width: 100%;
    > li {
        display: flex;
        width: 100%;
        align-items: center;
        cursor: pointer;
        gap: 1rem;
        padding: 0.8rem 1.2rem;
        &:nth-of-type(odd) {
            background-color: var(--overlay);
        }

        > i {
            color: var(--surface-alt);
        }

        > em {
            margin-left: auto;
        }
    }
}

.logo-header {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0.8rem;
    text-align: center;
}

.controls {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

h1.logo {
    font-weight: normal;
    font-size: 6.4rem;
    text-shadow: 0.2rem 0.2rem 0 var(--surface-alt);
}

@media (max-width: 768px) {
    .page__content {
        padding-top: 1.2rem;
    }

    .card.adventurers {
        min-width: unset;
    }

    ul.adventurers-list {
        > li {
            > span {
                overflow: hidden;
                text-overflow: ellipsis;
            }
            em {
                display: none;
            }
        }
    }
}
</style>
