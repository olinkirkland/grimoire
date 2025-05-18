<template>
    <Card class="card crucible">
        <header>
            {{ t('Step.Oathsworn.Oath.Tenet.builder') }}
        </header>

        <!-- Use some translations from crucible -->
        <div class="card-content">
            <p v-if="props.modelValue" class="crucible-value" v-html="props.modelValue"></p>
            <p v-else class="crucible-value-empty">
                <em>{{ t('Crucible.no-data') }}</em>
            </p>
            <div class="flex">
                <Button @click="onClickRoll">
                    <i class="fas fa-random"></i>
                    <span>{{ t('Crucible.roll') }}</span>
                </Button>
                <Button v-if="props.modelValue" @click="onClickCopy">
                    <i class="fas fa-copy"></i>
                    <span class="hide-on-mobile">{{ t('copy') }}</span>
                </Button>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import tenetData from '@/assets/data/tenet.json';
import { t } from '@/i18n/locale';
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});

const virtue = ref();
const connector = ref();
const subject = ref();
const relation = ref();
const motivation = ref();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onClickRoll() {
    Object.keys(tenetData).forEach((key) => {
        const arr: string[] = tenetData[key as keyof typeof tenetData];
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomItem = arr[randomIndex];
        switch (key) {
            case 'virtue':
                virtue.value = randomItem;
                break;
            case 'connector':
                connector.value = randomItem;
                break;
            case 'subject':
                subject.value = randomItem;
                break;
            case 'relation':
                relation.value = randomItem;
                break;
            case 'motivation':
                motivation.value = randomItem;
                break;
        }
    });

    const template = t('Step.Oathsworn.Oath.Tenet.template', {
        virtue: t(`Step.Oathsworn.Oath.Tenet.Virtue.${virtue.value}`),
        connector: t(`Step.Oathsworn.Oath.Tenet.Connector.${connector.value}`),
        subject: t(`Step.Oathsworn.Oath.Tenet.Subject.${subject.value}`),
        relation: t(`Step.Oathsworn.Oath.Tenet.Relation.${relation.value}`),
        motivation: t(`Step.Oathsworn.Oath.Tenet.Motivation.${motivation.value}`)
    });

    emit('update:modelValue', template);
}

function onClickCopy() {
    navigator.clipboard
        .writeText(props.modelValue)
        .then(() => {
            // Optionally show a success message
            console.log('Copied to clipboard');
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
}
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    gap: 0;

    header {
        width: 100%;
        background-color: var(--overlay);
        border-bottom: 1px solid var(--surface-border);
        padding: 0.6rem 0.8rem;
        gap: 0.4rem;
        color: var(--surface-alt);
        text-align: center;
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.1rem;
    }

    .card-content {
        width: 100%;
        padding: 1.6rem;
        padding-top: 0.8rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    p.crucible-value {
        color: var(--primary-alt);
    }

    p.crucible-value-empty {
        color: var(--surface-alt);
    }
}
</style>
