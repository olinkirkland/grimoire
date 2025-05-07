<template>
    <div class="page page--home">
        <div class="page__content" :class="{ center: displayedAdventurers.length === 0 }">
            <div class="hero glass">
                <div class="logo-header">
                    <h1 class="logo">{{ t('Brand.name') }}</h1>
                    <h3
                        v-html="
                            t('Brand.tagline', {
                                url: 'https://www.drivethrurpg.com/en/product/508618/grimwild?affiliate_id=4237062'
                            })
                        "
                    ></h3>
                </div>

                <div class="flex">
                    <Button primary @click="onClickNewAdventurer">
                        <i class="fas fa-plus-circle"></i>
                        <span> {{ t('Home.new-adventurer') }} </span>
                    </Button>
                    <Button @click="onClickSettings">
                        <span>{{ t('Home.settings') }}</span>
                    </Button>
                </div>

                <StorageMeter
                    v-if="false"
                    :usedBytes="adventurersStore.bytesUsedEstimate()"
                    :maxBytes="5 * 1024 * 1024"
                />
            </div>
            <CardDeck v-if="displayedAdventurers.length > 0">
                <AdventurerCard
                    v-for="adventurer in displayedAdventurers"
                    :adventurer="adventurer"
                    :key="adventurer.id"
                ></AdventurerCard>
            </CardDeck>
        </div>
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import AdventurerCard from '@/components/AdventurerCard.vue';
import Button from '@/components/ui/Button.vue';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { useAdventurersStore } from '@/store/adventurers-store';
import { getUniqueName } from '@/utils/naming-util';
import { onMounted, ref } from 'vue';
import TheFooter from '../TheFooter.vue';
import CardDeck from '../ui/CardDeck.vue';
import StorageMeter from '../ui/StorageMeter.vue';

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
}

function onClickSettings() {
    // TODO: Open settings modal
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    &.center {
        justify-content: center; // Override the default flex-start on mobile
    }
}

.hero {
    box-shadow: var(--shadow-sm);
    border-radius: 5px;
    padding: 2rem;
    gap: 1.2rem;
    > .logo-header > h1 {
        margin-bottom: 1.2rem;
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

h1.logo {
    font-weight: normal;
    font-size: 6.4rem;
    text-shadow: 0.2rem 0.2rem 0 var(--surface-alt);
}

@media (max-width: 768px) {
    .page__content {
        padding-top: 1.2rem;
        justify-content: flex-start;
    }
}
</style>
