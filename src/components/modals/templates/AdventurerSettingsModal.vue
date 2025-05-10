<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader closeButton>
                <h2>{{ t('Modals.App-settings.title') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content> </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import { t } from '@/i18n/locale';
</script>

<style scoped lang="scss"></style>
