<template>
    <Card :class="{ 'card--primary': primary, empty: !domain.name }" shadow>
        <h3>{{ domain.name }}</h3>
        <p class="domain-type">{{ t(`Step.Channel-divinity.Domains.${primary ? 'major' : 'minor'}`) }}</p>
        <p v-if="!domain.name" class="no-domain">
            {{ t('Step.Channel-divinity.Domains.empty') }}
        </p>
        <div class="domain__content" v-if="domain.name">
            <p v-if="domain.description">
                <em>{{ domain.description }}</em>
            </p>
            <p
                v-if="domain.tenets"
                v-html="t(`Step.Channel-divinity.Domains.tenets-phrase`, { tenets: domain.tenets })"
            ></p>
            <p
                v-if="domain.magic"
                v-html="t(`Step.Channel-divinity.Domains.magic-phrase`, { magic: domain.magic })"
            ></p>
        </div>
        <div class="controls">
            <Button @click="onClickRoll" :primary="primary">
                <i class="fas fa-random"></i>
                <span>{{ t('roll') }}</span>
            </Button>
            <Button @click="onClickEdit" :primary="primary">
                <i class="fas fa-edit"></i>
                <span>{{ t('edit') }}</span>
            </Button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import domainsData from '@/assets/data/domains.json';
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import { Domain } from '@/types/types';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import EditDomainModal from '../modals/templates/EditDomainModal.vue';
import Card from './Card.vue';

const props = defineProps({
    primary: Boolean,
    domain: {
        type: Object as () => Domain,
        required: true
    }
});

function onClickRoll() {
    // Set this domain to a random one
    const randomIndex = Math.floor(Math.random() * domainsData.length);
    const randomDomainKey = capitalizeFirstLetter(domainsData[randomIndex]);
    props.domain.name = t(`Step.Channel-divinity.${randomDomainKey}.name`);
    props.domain.description = t(`Step.Channel-divinity.${randomDomainKey}.description`);
    props.domain.tenets = t(`Step.Channel-divinity.${randomDomainKey}.tenets`);
    props.domain.magic = t(`Step.Channel-divinity.${randomDomainKey}.magic`);
}

function onClickEdit() {
    ModalController.open(EditDomainModal, {
        modelValue: props.domain
    });
}
</script>

<style scoped lang="scss">
.domain-type {
    color: var(--surface-alt);
    font-size: 1.4rem;
    font-style: italic;
}

.controls {
    display: flex;
    padding-top: 0.8rem;
    margin-top: auto;
    gap: 0.8rem;
}

.card {
    gap: 0;
    > p.domain-type {
        margin-top: -0.4rem;
        margin-bottom: 0.8rem;
    }
    .domain__content {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }
}

.empty {
    .controls {
        margin-top: unset;
    }
}

.card--primary {
    background-color: var(--primary-light);
    > h3 {
        color: var(--primary-alt);
    }
    > .domain-type {
        color: var(--primary);
    }
}

.no-domain {
    font-size: 1.4rem;
}
</style>
