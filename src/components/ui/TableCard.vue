<template>
    <Card class="table-card" :class="{ 'table-card--many': props.many }">
        <header v-if="title" class="table-header">
            <h2>{{ title }}</h2>
        </header>
        <ul>
            <li v-for="(item, index) in items" :key="index" class="table-row">
                <slot name="item" :item="item"></slot>
            </li>
        </ul>
    </Card>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: false
    },
    items: {
        type: Array as () => any[],
        required: true
    },
    many: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.card {
    padding: 0;
    gap: 0;

    ul {
        width: 100%;
    }
}

.table-card--many > ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1rem;
    > li {
        background-color: unset;
    }
}

header {
    width: 100%;
    text-align: center;
    padding: 0.4rem 0.8rem;
    color: var(--surface-alt);
    border-bottom: 1px dashed var(--surface-border);
}

li {
    width: 100%;
    padding: 0.4rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(odd) {
        background-color: var(--overlay);
    }
}
</style>
