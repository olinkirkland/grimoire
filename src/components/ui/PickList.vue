<template>
    <Card>
        <ul class="pick-list" :class="{ wide: averageItemLength > 12 }">
            <li v-for="(item, index) in items" :key="index" @click="onClickCycleItem(item)">
                <i :class="getItemSelectionClass(item)"></i>
                <span v-html="labelFunction ? labelFunction(item) : item"></span>
            </li>
        </ul>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    items: string[];
    selectedItems: string[];
    notSelectedItems: string[];
    labelFunction?: (item: string) => string;
}>();

const emit = defineEmits<{
    (e: 'update:selectedItems', value: string[]): void;
    (e: 'update:notSelectedItems', value: string[]): void;
}>();

const averageItemLength = computed(() => {
    // Take the average of the top 10% of items
    const labels = props.items.map((item) => (props.labelFunction ? props.labelFunction(item) : item));
    const topItems = labels.sort((a, b) => b.length - a.length).slice(0, Math.ceil(labels.length * 0.1));
    const totalLength = topItems.reduce((acc, item) => acc + item.length, 0);
    return totalLength / topItems.length;
});

function getItemSelectionClass(item: string): string {
    if (props.selectedItems.includes(item)) return 'fas fa-circle';
    return props.notSelectedItems.includes(item) ? 'fas fa-ban' : 'far fa-circle';
}

function onClickCycleItem(item: string) {
    const isSelected = props.selectedItems.includes(item);
    const isNotSelected = props.notSelectedItems.includes(item);

    if (!isSelected && !isNotSelected) {
        emit('update:selectedItems', [...props.selectedItems, item]);
        return;
    }
    if (isSelected) {
        emit(
            'update:selectedItems',
            props.selectedItems.filter((i) => i !== item)
        );
        emit('update:notSelectedItems', [...props.notSelectedItems, item]);
        return;
    }
    if (isNotSelected) {
        emit(
            'update:notSelectedItems',
            props.notSelectedItems.filter((i) => i !== item)
        );
    }
}
</script>

<style scoped lang="scss">
.card {
    background-color: var(--overlay);
    padding: 1rem;
}

ul.pick-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    &.wide {
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }
    > li {
        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;
        padding: 0.4rem 0.8rem;
        font-style: italic;

        > span {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
