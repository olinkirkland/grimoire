<template>
    <div class="input-group">
        <div class="prepend" :class="{ 'is-slot-empty': isSlotEmpty }">
            <slot></slot>
        </div>
        <input v-bind="attrs" :value="modelValue" @input="onInput" ref="input" />
        <button v-if="modelValue" class="clear-button" @click="clearInput">
            <i class="fas fa-times-circle"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, useAttrs, useSlots } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const input = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const attrs: Record<string, unknown> = useAttrs();
const slots: Record<string, unknown> = useSlots();

const isSlotEmpty = computed(() => {
    //@ts-ignore
    const defaultSlot = slots.default?.();
    const children = defaultSlot?.filter((v: any) => v.type !== Comment && v.type !== Text) ?? [];
    if (children.length === 0) return true;
    const firstChild = children[0];
    return firstChild?.children?.length === 0;
});

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}

function clearInput() {
    emit('update:modelValue', '');
    if (input.value) {
        input.value.value = '';
    }
}
</script>

<style scoped lang="scss">
.input-group {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 5px;
    height: 3.2rem;
    width: 100%;
    max-width: 40rem;
    min-height: 3.2rem;
    background-color: var(--background);
    border: 1px solid var(--surface-alt);
    padding-right: 0.8rem;
    outline: none;
    overflow: hidden;

    &:focus-within {
        outline: 2px solid var(--primary-alt);
        outline-offset: 0.2rem;
        > .prepend * {
            color: var(--primary-alt);
        }
        button {
            display: block;
        }
    }

    > .prepend {
        display: flex;
        flex-shrink: 0;
        gap: 0.8rem;
        align-items: center;
        padding: 0 1.2rem;
        background-color: var(--surface);
        margin-right: 0.6rem;
        height: 100%;
        border-right: 1px solid var(--surface-alt);
        white-space: nowrap;
    }

    .is-slot-empty {
        padding: 0;
        border: none;
        background: none;
    }

    > input {
        display: block;
        width: 100%;
        overflow: hidden;
        height: 100%;
        background-color: transparent;
        color: var(--primary);

        &:focus {
            outline: none;
        }
        &::placeholder {
            opacity: 0.5;
            font-style: italic;
        }
    }

    > .clear-button {
        display: none;
        background: none;
        border: none;
        color: var(--primary);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.2rem;
        margin-left: 0.2rem;

        &:hover {
            color: var(--primary-alt);
        }
    }

    &:focus-within > .clear-button {
        display: block;
    }
}
</style>
