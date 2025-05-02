<template>
    <div class="page page--lost">
        <h1>{{ t('Lost-page.title') }}</h1>
        <p>{{ t('Lost-page.description') }}</p>
        <Button @click="onClickGoHome()">
            <i class="fas fa-home"></i>
            <span>{{ t('Lost-page.button') }}</span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';

function onClickGoHome() {
    router.push({ name: PageName.HOME });
}
</script>

<style lang="scss" scoped></style>
