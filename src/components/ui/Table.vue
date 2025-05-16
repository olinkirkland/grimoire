<template>
    <Card class="table">
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
        type: Array,
        required: true
    }
});
</script>

<style scoped lang="scss">
.card {
    padding: 0;
}
ul {
    width: 100%;
}

li {
    width: 100%;
    padding: 0.4rem 0.8rem;
    display: flex;
    &:nth-child(odd) {
        background-color: var(--overlay);
    }
}
</style>
