<template>
    <div class="page page--home">
        <Card>
            <div class="logo-header">
                <h1 class="logo">
                    {{ t('Brand.name')
                    }}<span class="version">{{ version }}</span>
                </h1>
                <h2>{{ t('Brand.tagline') }}</h2>
            </div>

            <div class="flex">
                <Button primary @click="onClickNewAdventurer">
                    <i class="fas fa-plus-circle"></i>
                    <span> {{ t('Home.new-adventurer') }} </span>
                </Button>
                <Button @click="onClickLoadAdventurer">
                    <i class="fas fa-folder-open"></i>
                    <span>{{ t('Home.load-adventurer') }}</span>
                </Button>
            </div>

            <StorageMeter
                v-if="false"
                :usedBytes="adventurersStore.bytesUsedEstimate()"
                :maxBytes="5 * 1024 * 1024"
            />
        </Card>
        <Card v-if="displayedAdventurers.length > 0">
            <h2>
                {{
                    t('Home.recent-adventurers', {
                        count: displayedAdventurers.length.toString()
                    })
                }}
            </h2>
            <ul class="adventurers-list">
                <AdventurerCard
                    v-for="adventurer in displayedAdventurers"
                    :adventurer="adventurer"
                    :key="adventurer.id"
                ></AdventurerCard>
            </ul>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { version } from '@/../package.json'; // Import version from package.json
import Adventurer from '@/adventurer';
import AdventurerCard from '@/components/AdventurerCard.vue';
import InfoModal from '@/components/modals/templates/InfoModal.vue';
import LoadingModal from '@/components/modals/templates/LoadingModal.vue';
import Button from '@/components/ui/Button.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { useAdventurersStore } from '@/store/adventurers-store';
import { getUniqueName } from '@/utils/naming-util';
import { v4 as uuid } from 'uuid';
import { onMounted, ref } from 'vue';
import Card from '../ui/Card.vue';
import StorageMeter from '../ui/StorageMeter.vue';

const adventurersStore = useAdventurersStore();
const displayedAdventurers = ref<Adventurer[]>([]);

onMounted(updateDisplayedAdventurers);

function updateDisplayedAdventurers() {
    // Update displayedAdventurers with the adventurers from the store
    displayedAdventurers.value = [...adventurersStore.adventurers].sort(
        (a, b) => {
            // Sort by last modified date (most recent first)
            return b.updatedAt - a.updatedAt;
        }
    );
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

function onClickLoadAdventurer() {
    ModalController.open(LoadingModal);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json'; // Accept only .json files
    fileInput.multiple = false;
    fileInput.addEventListener('change', async (event) => {
        const { files } = event.target as HTMLInputElement;
        if (!files || files.length === 0) return;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const fileContent = e.target?.result as string;
            try {
                const newAdventurer = JSON.parse(fileContent) as Adventurer;
                newAdventurer.id = uuid();
                // Adjust name
                newAdventurer.name = getUniqueName(
                    adventurersStore.adventurers.map(
                        (adventurer) => adventurer.name
                    ),
                    newAdventurer.name
                );
                adventurersStore.addAdventurer(newAdventurer);
                updateDisplayedAdventurers();
                ModalController.close();
                ModalController.open(InfoModal, {
                    title: t('Modals.Load-adventurer-success.title'),
                    message: t('Modals.Load-adventurer-success.message', {
                        name: newAdventurer.name
                    })
                });
            } catch (error) {
                console.error('Error loading adventurer:', error);
                ModalController.close();
                ModalController.open(InfoModal, {
                    title: t('Modals.Load-adventurer-error.title'),
                    message: t('Modals.Load-adventurer-error.message', {
                        name: file.name,
                        error: (error as Error).message
                    }),
                    mode: 'danger'
                });
            }
        };

        reader.readAsText(file);
    });
    fileInput.addEventListener('cancel', (event) => {
        console.log(event);
        ModalController.close();
    });
    fileInput.click();
}
</script>

<style lang="scss" scoped>
.logo-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;

    > h2 {
        opacity: 0.5;
    }
}

h1.logo {
    font-size: 4rem;
    text-transform: uppercase;
    text-shadow: 0.2rem 0.2rem 0 var(--surface-alt);

    > .version {
        text-shadow: none;
        font-size: 1.2rem;
        font-weight: normal;
        margin-left: 0.4rem;
    }
}

.adventurers-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
}
</style>
