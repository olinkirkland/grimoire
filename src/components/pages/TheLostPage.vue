<template>
    <div class="page">
        <p class="title">{{ t('Lost-page.title') }}</p>
        <p class="description" v-html="t('Lost-page.description')"></p>
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

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    p.title {
        font-weight: bold;
    }

    p.description {
        text-align: center;
    }
}
</style>
