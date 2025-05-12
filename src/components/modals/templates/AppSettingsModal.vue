<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader closeButton>
                <h2>{{ t('Modals.App-settings.title') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="settings">
                <!-- Language -->
                <ul class="language-list">
                    <li
                        v-for="l in languages"
                        :key="l"
                        :class="{ selected: l === useI18n().locale.value }"
                        @click="changeLanguage(l)"
                    >
                        <img :src="`assets/flags/${l}.png`" :alt="l" />
                        <span>{{ t(`Language.${l}`) }}</span>
                    </li>
                </ul>
                <!-- Tracking -->
                <Card>
                    <div>
                        <h3>{{ t('Modals.App-settings.Tracking.title') }}</h3>
                        <p v-html="t('Modals.App-settings.Tracking.description')"></p>
                    </div>
                    <Button @click="onToggleTracking">
                        <i class="fas" :class="isTrackingEnabled ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                        <span>{{ isTrackingEnabled ? t('on') : t('off') }}</span>
                    </Button>
                </Card>
                <!-- Storage -->
                <Card>
                    <div>
                        <h3>{{ t('Modals.App-settings.Storage.title') }}</h3>
                        <p
                            v-html="
                                t('Modals.App-settings.Storage.description', {
                                    count: useAdventurersStore().adventurers.length.toString(),
                                    bytes: bytesToReadable(useAdventurersStore().bytesUsedEstimate())
                                })
                            "
                        ></p>
                    </div>
                    <Button @click="onClickClearStorage">
                        <i class="fas fa-trash-alt"></i>
                        <span>{{ t('Modals.App-settings.Storage.delete-all') }}</span>
                    </Button>
                </Card>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import AppSettingsModal from '@/components/modals/templates/AppSettingsModal.vue';
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import Button from '@/components/ui/Button.vue';
import { changeLanguage, t } from '@/i18n/locale';
import { useAdventurersStore } from '@/store/adventurers-store';
import { startTracking, stopTracking } from '@/tracker';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ModalController from '@/controllers/modal-controller';
import ConfirmModal from './ConfirmModal.vue';
import LoadingModal from './LoadingModal.vue';
import { bytesToReadable } from '@/utils/storage-util';

const props = defineProps<{}>();

const languages = ['en', 'de', 'fr', 'es', 'it'];
const isTrackingEnabled = ref(localStorage.getItem('tracking') === 'true');

function onToggleTracking() {
    const allowTracking = !isTrackingEnabled.value;
    localStorage.setItem('tracking', allowTracking.toString());
    if (allowTracking) startTracking();
    else stopTracking();
    isTrackingEnabled.value = allowTracking;
}

function onClickClearStorage() {
    ModalController.close();
    ModalController.open(ConfirmModal, {
        title: t('Modals.App-settings.Storage.Confirm.title'),
        message: t('Modals.App-settings.Storage.Confirm.message'),
        confirmText: t('Modals.App-settings.Storage.Confirm.confirm-button'),
        isConfirmButtonDanger: true,
        onConfirm: () => {
            ModalController.close();
            ModalController.open(LoadingModal);
            setTimeout(() => {
                localStorage.clear();
                location.reload();
            }, 200);
        },
        cancelText: t('Modals.App-settings.Storage.Confirm.cancel-button'),
        onCancel: () => {
            ModalController.close();
            ModalController.open(AppSettingsModal);
        }
    });
}
</script>

<style scoped lang="scss">
.settings {
    display: flex;
    align-items: center;
    max-width: 64rem;
    width: 64rem;
    flex-direction: column;
    gap: 1.6rem;
}

.card {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;

    h3 {
        font-weight: bold;
    }
}

ul.language-list {
    display: flex;
    gap: 1rem;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    > li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        &.selected {
            opacity: 1;
        }

        img {
            width: 8rem;
        }

        span {
            position: relative;
            top: -0.8rem;
            width: 100%;
            text-align: center;
        }
    }
}

@media (max-width: 768px) {
    .settings {
        flex-direction: column;
        max-width: 100%;
    }

    .card {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
