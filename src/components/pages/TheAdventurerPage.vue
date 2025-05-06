<template>
    <div v-if="!!adventurer" class="page adventurer-page">
        <p>Adventurer</p>
        <h2>{{ adventurer.name }}</h2>
        <InputGroup v-model="adventurer.name" :placeholder="t('Adventurer.name-placeholder')">
            {{ t('Adventurer.name') }}
        </InputGroup>

        <Button @click="onClickDeleteAdventurer">
            <span>{{ t('Adventurer.delete-adventurer') }}</span>
        </Button>
        <Button @click="onClickGoHome">
            <i class="fas fa-home"></i>
            <span>{{ t('Adventurer.go-home') }}</span>
        </Button>

        <Card>
            <p>Portrait</p>
            <ul class="portraits-list">
                <li v-for="portrait in portraitData" :class="{ selected: adventurer.portraitId === portrait.id }">
                    <img
                        :src="portrait.url"
                        :alt="portrait.url"
                        :key="portrait.id"
                        @click="adventurer.portraitId = portrait.id"
                    />
                </li>
            </ul>
        </Card>

        <pre>{{ adventurer }}</pre>
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import portraitData from '@/assets/data/portraits.json';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { useAdventurersStore } from '@/store/adventurers-store';
import { ref } from 'vue';
import Button from '../ui/Button.vue';
import InputGroup from '../ui/InputGroup.vue';

const adventurersStore = useAdventurersStore();

// Get the adventurer ID from the route params
const adventurerId = ref<string | null>(null);
adventurerId.value = router.currentRoute.value.params.id as string;

const adventurer = ref<Adventurer | null>(adventurersStore.getAdventurer(adventurerId.value) || null);

if (!adventurer.value) {
    // Redirect to the home page if the adventurer is not found
    router.push({ name: PageName.LOST });
}

function onClickDeleteAdventurer() {
    if (!adventurer.value) return;
    adventurersStore.removeAdventurer(adventurer.value.id);
    router.push({ name: PageName.HOME });
}

function onClickGoHome() {
    // Redirect to the home page
    router.push({ name: PageName.HOME });
}
</script>

<style scoped lang="scss">
ul.portraits-list {
    display: grid;
    min-width: 32rem;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 0.4rem;

    > li {
        width: 100%;
        height: 6.4rem;
        overflow: hidden;

        &:not(.selected) {
            opacity: 0.6;
        }

        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
            cursor: pointer;
            transition: all 0.2s ease;
            border-radius: 5px;
        }

        p {
            font-size: 1.2rem;
            text-align: center;
        }
    }
}
</style>
