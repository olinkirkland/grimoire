<template>
    <ModalFrame class="crucible-modal">
        <template v-slot:header>
            <ModalHeader close-button>
                <h2>{{ props.title }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <ReferenceCard :page="6">
                <p class="crucible-description" v-html="t('Crucible.description')"></p>
            </ReferenceCard>
            <div class="crucible-choice">
                <Button @click="onClickRoll">
                    <i class="fas fa-random"></i>
                    <span v-if="currentValue">
                        {{ props.labelFunction(currentValue) }}
                    </span>
                    <em v-else>{{ t('Crucible.empty') }}</em>
                </Button>
            </div>
            <Card class="crucible">
                <ul>
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        :class="{
                            selected: item === currentValue
                        }"
                        @click="onClickItem(item)"
                    >
                        {{ props.labelFunction(item) }}
                    </li>
                </ul>
            </Card>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import Card from '@/components/ui/Card.vue';
import ReferenceCard from '@/components/ui/ReferenceCard.vue';
import { t } from '@/i18n/locale';
import { ref } from 'vue';

const props = defineProps<{
    title: string;
    items: string[]; // Expect 36 items
    labelFunction: (value: string) => string;
    modelValue: string;
    onUpdateModelValue: (value: string) => void;
}>();

const currentValue = ref(props.modelValue);

function onClickItem(item: string) {
    if (item === currentValue.value) {
        currentValue.value = '';
        props.onUpdateModelValue('');
        return;
    }
    currentValue.value = item;
    props.onUpdateModelValue(item);
}

function onClickRoll() {
    const randomIndex = Math.floor(Math.random() * props.items.length);
    currentValue.value = props.items[randomIndex];
    props.onUpdateModelValue(currentValue.value);
}
</script>

<style scoped lang="scss">
.crucible-choice {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.6rem;
}

.crucible-modal {
    max-width: 96rem;
}

.crucible {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 1.6rem;
    justify-content: space-between;

    .crucible-description {
        font-size: 1.6rem;
    }

    > ul {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(6, 1fr);
        padding: 1.6rem;

        > li {
            cursor: pointer;
            padding: 0.4rem 0.8rem;
            background-color: var(--background);
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.4rem;
            line-height: 1.4;
            text-align: center;

            &.selected {
                color: var(--primary-alt);
            }
        }
    }
}

@media (max-width: 768px) {
    .crucible {
        > ul {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>
