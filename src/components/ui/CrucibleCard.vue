<template>
    <Card class="card">
        <header>
            <i class="fas fa-border-all"></i>
            <span>
                {{ t('Crucible.heading', { title }) }}
            </span>
        </header>

        <div class="card-content">
            <p v-if="props.modelValue" class="crucible-value">
                {{ props.labelFunction(props.modelValue) }}
            </p>
            <p v-else class="crucible-value-empty">
                <em>{{ t('Crucible.no-data') }}</em>
            </p>
            <ButtonBar>
                <Button @click="onClickRoll">
                    <i class="fas fa-random"></i>
                    <span>{{ t('Crucible.roll') }}</span>
                </Button>
                <Button @click="onClickOpenCrucible()">
                    <i class="fas fa-border-all"></i>
                    <span>{{ t('Crucible.choose') }}</span>
                </Button>
            </ButtonBar>
        </div>
    </Card>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { t } from '@/i18n/locale';
import CrucibleModal from '../modals/templates/CrucibleModal.vue';
import Card from './Card.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array as () => string[],
        required: true
    },
    labelFunction: {
        type: Function as unknown as () => (value: string) => string,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onClickRoll() {
    const randomIndex = Math.floor(Math.random() * props.items.length);
    const randomItem = props.items[randomIndex];
    emit('update:modelValue', randomItem);
}

function onClickOpenCrucible() {
    ModalController.open(CrucibleModal, {
        title: t('Crucible.heading', { title: props.title }),
        items: props.items,
        labelFunction: props.labelFunction,
        modelValue: props.modelValue,
        onUpdateModelValue: (value: string) => {
            console.log('Item selected:', value);
            emit('update:modelValue', value);
        }
    });
}
</script>

<style lang="scss" scoped>
.card {
    width: fit-content;
    align-items: center;
    justify-content: space-between;
    padding: 0;

    header {
        width: 100%;
        background-color: var(--overlay);
        border: 1px solid var(--surface-border);
        padding: 0.4rem 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;

        > * {
            color: var(--surface-alt);
            text-transform: uppercase;
            font-size: 1.2rem;
            letter-spacing: 0.1rem;
        }
    }

    .card-content {
        width: 100%;
        padding: 1.6rem;
        padding-top: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.8rem;
    }

    p.crucible-value {
        color: var(--primary-alt);
    }

    p.crucible-value-empty {
        color: var(--surface-alt);
    }
}
</style>
