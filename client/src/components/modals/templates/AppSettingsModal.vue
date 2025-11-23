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
                <ul class="language-list" v-if="languages.length > 1">
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
                    <ButtonBar>
                        <Button @click="onClickTrackingOn" :pressed="isTrackingEnabled">
                            {{ t('on') }}
                        </Button>
                        <Button @click="onClickTrackingOff" :pressed="!isTrackingEnabled">
                            {{ t('off') }}
                        </Button>
                    </ButtonBar>
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
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import AppSettingsModal from '@/components/modals/templates/AppSettingsModal.vue';
import ModalController from '@/controllers/modal-controller';
import { changeLanguage, t } from '@/i18n/locale';
import { useAdventurersStore } from '@/store/adventurers-store';
import { startTracking, stopTracking } from '@/tracker';
import { bytesToReadable } from '@/utils/storage-util';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ConfirmModal from './ConfirmModal.vue';
import LoadingModal from './LoadingModal.vue';

const props = defineProps<{}>();

const languages = ['en'];
const isTrackingEnabled = ref(localStorage.getItem('tracking') === 'true');

function onClickTrackingOn() {
    isTrackingEnabled.value = true;
    localStorage.setItem('tracking', isTrackingEnabled.value.toString());
    startTracking();
}

function onClickTrackingOff() {
    isTrackingEnabled.value = false;
    localStorage.setItem('tracking', isTrackingEnabled.value.toString());
    stopTracking();
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
