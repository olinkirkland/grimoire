<template>
    <ModalFrame class="edit-domain-modal">
        <template v-slot:header>
            <ModalHeader close-button>
                <h2>{{ t('Modals.Edit-domain.title') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="edit-domain-modal__content">
                <p v-html="t('Modals.Edit-domain.instructions')"></p>
                <InputGroup
                    v-model="modelValue.name"
                    :placeholder="t('Step.Channel-divinity.Domains.Name.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Name.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="modelValue.description"
                    :placeholder="t('Step.Channel-divinity.Domains.Utility.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Utility.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="modelValue.tenets"
                    :placeholder="t('Step.Channel-divinity.Domains.Tenets.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Tenets.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="modelValue.magic"
                    :placeholder="t('Step.Channel-divinity.Domains.Magic.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Magic.label') }} </span>
                </InputGroup>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import { t } from '@/i18n/locale';

type Domain = {
    name: string;
    description: string;
    tenets: string;
    magic: string;
};
const props = defineProps<{
    modelValue: Domain;
    onUpdateModelValue: (value: Domain) => void;
}>();
</script>

<style scoped lang="scss">
.edit-domain-modal {
    min-width: 48rem;
    max-width: 96rem;

    .edit-domain-modal__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        > .input-group {
            width: 100%;
            max-width: unset;
        }
    }
}
</style>
