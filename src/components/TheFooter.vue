<template>
    <footer>
        <div class="logo-and-olin">
            <h1 class="logo">
                {{ t('Brand.name') }}
                <span class="version">v{{ version }}</span>
            </h1>
            www.olinkirk.land/grimoire
            <p>
                <a @click="onClickChangelog">
                    {{ t('Home.Attribution.changelog') }}
                </a>
            </p>
            <p v-html="t('Home.Attribution.code-and-design')"></p>
            <p v-html="t('Home.Attribution.localization')"></p>
            <p
                class="muted"
                v-html="
                    t('Home.Attribution.copyright', {
                        year: new Date().getFullYear().toString()
                    })
                "
            ></p>
        </div>
        <div>
            <p v-html="t('Home.Attribution.license-blades-in-the-dark')"></p>
        </div>
        <div>
            <p v-html="t('Home.Attribution.license-portraits')"></p>
            <p v-html="t('Home.Attribution.license-icons')"></p>
        </div>
    </footer>
</template>

<script setup lang="ts">
// Get the version from the package.json file
import { version } from '@/../package.json';
import { t } from '@/i18n/locale';

function onClickChangelog() {
    // TODO: Open changelog modal
}
</script>

<style scoped lang="scss">
footer {
    max-width: 96rem;
    margin: 0 auto;
    padding: 1.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    border-top: 1px solid var(--surface-alt);
    background-color: var(--overlay);

    p,
    a {
        font-size: 1.4rem;
        line-height: 1.6;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    > .logo-and-olin {
        h1 {
            font-size: 2.4rem;
        }
        h2 {
            font-size: 2.4rem;
            opacity: 0.4;
            text-transform: uppercase;
        }
    }
}
</style>
