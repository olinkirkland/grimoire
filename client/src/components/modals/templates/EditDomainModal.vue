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
                    v-model="localValue.name"
                    :placeholder="t('Step.Channel-divinity.Domains.Name.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Name.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="localValue.description"
                    :placeholder="t('Step.Channel-divinity.Domains.Utility.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Utility.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="localValue.tenets"
                    :placeholder="t('Step.Channel-divinity.Domains.Tenets.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Tenets.label') }} </span>
                </InputGroup>
                <InputGroup
                    v-model="localValue.magic"
                    :placeholder="t('Step.Channel-divinity.Domains.Magic.placeholder')"
                >
                    <span> {{ t('Step.Channel-divinity.Domains.Magic.label') }} </span>
                </InputGroup>
            </div>
            <Card class="preset-domains table-card">
                <ul class="table">
                    <li v-for="(domain, index) in domainsData" :key="index" @click="onClickApplyDomain(domain)">
                        <!-- Domain card to pick from -->
                        <h3 v-html="t(`Step.Channel-divinity.${capitalizeFirstLetter(domain)}.name`)"></h3>
                        <p v-html="t(`Step.Channel-divinity.${capitalizeFirstLetter(domain)}.description`)"></p>
                        <p
                            v-html="
                                t(`Step.Channel-divinity.Domains.tenets-phrase`, {
                                    tenets: t(`Step.Channel-divinity.${capitalizeFirstLetter(domain)}.tenets`)
                                })
                            "
                        ></p>
                        <p
                            v-html="
                                t(`Step.Channel-divinity.Domains.magic-phrase`, {
                                    magic: t(`Step.Channel-divinity.${capitalizeFirstLetter(domain)}.magic`)
                                })
                            "
                        ></p>
                    </li></ul
            ></Card>
        </template>
        <template v-slot:footer>
            <Button @click="onClickCancel">
                <span>{{ t('Modals.Edit-domain.cancel') }}</span>
            </Button>
            <Button @click="onClickSave" primary>
                <i class="fas fa-save"></i>
                <span>{{ t('Modals.Edit-domain.save') }}</span>
            </Button>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import domainsData from '@/assets/data/domains.json';
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/string-util';
import { ref } from 'vue';

type Domain = {
    name: string;
    description: string;
    tenets: string;
    magic: string;
};

const props = defineProps<{
    modelValue: Domain;
}>();

const localValue = ref<Domain>({
    name: props.modelValue.name,
    description: props.modelValue.description,
    tenets: props.modelValue.tenets,
    magic: props.modelValue.magic
});

function onClickApplyDomain(domain: string) {
    // Set this domain to the selected one
    const domainKey = capitalizeFirstLetter(domain);
    localValue.value.name = t(`Step.Channel-divinity.${domainKey}.name`);
    localValue.value.description = t(`Step.Channel-divinity.${domainKey}.description`);
    localValue.value.tenets = t(`Step.Channel-divinity.${domainKey}.tenets`);
    localValue.value.magic = t(`Step.Channel-divinity.${domainKey}.magic`);
}

function onClickSave() {
    // Emit the new value to the parent component
    props.modelValue.description = localValue.value.description;
    props.modelValue.name = localValue.value.name;
    props.modelValue.tenets = localValue.value.tenets;
    props.modelValue.magic = localValue.value.magic;
    ModalController.close();
}

function onClickCancel() {
    // Close the modal without saving
    ModalController.close();
}
</script>

<style scoped lang="scss">
.edit-domain-modal {
    max-width: 96rem;

    .edit-domain-modal__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
}

.preset-domains {
    margin-top: 1rem;
    li {
        display: flex;
        flex-direction: column;
        font-style: normal;
        cursor: pointer;
        padding: 1rem;

        h3 {
            margin-bottom: 0;
        }

        h3 + p {
            font-style: italic;
        }
    }
}
</style>
