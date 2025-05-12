<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader>
                <h2>{{ props.title }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="crucible">
                <p class="crucible__message" v-html="props.message"></p>
                <ul>
                    <li v-for="(item, index) in props.items" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';

const props = defineProps<{
    title: string;
    message: string;
    items: string[]; // Expects 36 items
}>();
</script>

<style scoped lang="scss">
.crucible {
    display: flex;
    max-width: 32rem;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: space-between;
    height: 100%;

    > .crucible__message {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }
}
</style>
