<template>
    <Card :class="{ 'card--primary': primary }" shadow>
        <pre>{{ domain }}</pre>
        <h3>{{ domain.name }}</h3>
        <p>{{ domain.description }}</p>
        <p>{{ domain.tenets }}</p>
        <p>{{ domain.magic }}</p>
        <div class="flex">
            <Button @click="onClickRoll">
                <i class="fas fa-random"></i>
                <span>{{ t('roll') }}</span>
            </Button>
            <Button @click="onClickEdit">
                <i class="fas fa-edit"></i>
                <span>{{ t('edit') }}</span>
            </Button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { t } from '@/i18n/locale';
import Card from './Card.vue';
import domainsData from '@/assets/data/domains.json';

const props = defineProps({
    primary: Boolean,
    domain: {
        type: Object as () => {
            name: string;
            description: string;
            tenets: string;
            magic: string;
        },
        required: true
    }
});

function onClickRoll() {
    // Set this domain to a random one
    const randomIndex = Math.floor(Math.random() * domainsData.length);
    const randomDomain = domainsData[randomIndex];
    props.domain.name = t(`Step.${randomDomain}.name`);
}

function onClickEdit() {}
</script>

<style scoped lang="scss">
.card--primary {
    background-color: var(--primary-light);
    > h3 {
        color: var(--primary);
    }
}
</style>
