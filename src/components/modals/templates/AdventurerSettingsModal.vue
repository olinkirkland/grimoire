<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader closeButton>
                <h2>{{ t('Modals.Adventurer-settings.title') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="settings">
                <Card>
                    <div>
                        <h3>{{ t('Modals.Adventurer-settings.Delete.title') }}</h3>
                        <p v-html="t('Modals.Adventurer-settings.Delete.description')"></p>
                    </div>
                    <Button @click="onClickDelete">
                        <i class="fas fa-trash-alt"></i>
                        <span>{{ t('Modals.Adventurer-settings.Delete.label') }}</span>
                    </Button>
                </Card>
                <!-- Use Heritage or Background -->
                <Card>
                    <div>
                        <h3>{{ t('Modals.Adventurer-settings.Use-heritage.title') }}</h3>
                        <p v-html="t('Modals.Adventurer-settings.Use-heritage.description')"></p>
                    </div>
                    <ButtonBar>
                        <Button
                            @click="adventurer.options.useHeritage = true"
                            :pressed="adventurer.options.useHeritage"
                        >
                            <span>{{ t('Modals.Adventurer-settings.Use-heritage.heritage') }}</span>
                        </Button>
                        <Button
                            @click="adventurer.options.useHeritage = false"
                            :pressed="!adventurer.options.useHeritage"
                        >
                            <span>{{ t('Modals.Adventurer-settings.Use-heritage.background') }}</span>
                        </Button>
                    </ButtonBar>
                </Card>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import ConfirmModal from './ConfirmModal.vue';
import Adventurer from '@/adventurer';
import { useAdventurersStore } from '@/store/adventurers-store';
import { PageName, router } from '@/router';
import AdventurerSettingsModal from './AdventurerSettingsModal.vue';
import LoadingModal from './LoadingModal.vue';

const props = defineProps<{
    adventurer: Adventurer;
}>();

function onClickDelete() {
    // Are you sure?
    ModalController.close();
    ModalController.open(ConfirmModal, {
        title: t('Modals.Adventurer-settings.Delete.title'),
        message: t('Modals.Adventurer-settings.Delete.message', { name: props.adventurer.name }),
        isConfirmButtonDanger: true,
        confirmText: t('Modals.Delete.Controls.confirm'),
        cancelText: t('Modals.Delete.Controls.cancel'),
        onConfirm: () => {
            useAdventurersStore().removeAdventurer(props.adventurer.id);
            router.push({ name: PageName.HOME });

            // Show Loading Modal for 0.5 seconds
            ModalController.close();
            ModalController.open(LoadingModal);
            setTimeout(() => {
                ModalController.close();
            }, 500);
        },
        onCancel: () => {
            // Return to the previous modal
            ModalController.close();
            ModalController.open(AdventurerSettingsModal, {
                adventurer: props.adventurer
            });
        }
    });
}
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    display: flex;
    max-width: 64rem;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;

    h3 {
        font-weight: bold;
    }
}

.settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (max-width: 768px) {
    .card {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
