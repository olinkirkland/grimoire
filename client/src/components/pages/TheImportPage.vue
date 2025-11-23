<template>
    <div class="page page--import">
        <p>IMPORT PAGE</p>
        <pre>{{ encodedData }}</pre>
    </div>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import { useAdventurersStore } from '@/store/adventurers-store';
import { decodeURI } from '@/utils/adventurer-util';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';
import InfoModal from '../modals/templates/InfoModal.vue';

const encodedData = ref<string | null>(null);
const { params } = router.currentRoute.value;
encodedData.value = params.data as string | null;
let adventurer: Adventurer | null = null;
try {
    if (encodedData.value) adventurer = decodeURI(encodedData.value);
} catch (e) {
    console.error('Error decoding data:', e);
}

if (adventurer) {
    adventurer.id = uuid();
    useAdventurersStore().addAdventurer(adventurer);
    router.push({
        name: PageName.ADVENTURER,
        params: { id: adventurer.id }
    });
    ModalController.open(InfoModal, {
        title: t('Modals.Import.title'),
        message: t('Modals.Import.message', { name: adventurer.name })
    });
} else {
    console.error('No valid adventurer data found.');
    // Redirect to the home page and open an error modal
    router.push({ name: PageName.HOME });
    ModalController.open(InfoModal, {
        title: t('Modals.Import-error.title'),
        message: t('Modals.Import-error.message')
    });
}
</script>
