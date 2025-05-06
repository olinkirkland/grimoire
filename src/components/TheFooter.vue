<template>
    <footer>
        <div class="footer__content">
            <div class="logo-and-olin">
                <h1 class="logo">
                    {{ t('Brand.name') }}
                    <span class="version">v{{ version }}</span>
                </h1>
                <p>
                    <a @click="onClickChangelog">
                        {{ t('Home.Attribution.changelog') }}
                    </a>
                </p>
                <p v-html="t('Home.Attribution.code-and-design')"></p>
                <!-- <p v-html="t('Home.Attribution.localization')"></p> -->
                <a href="https://opensource.org/licenses/MIT" target="_blank">{{ t('Home.Attribution.license') }}</a>
            </div>
            <div>
                <p v-html="t('Home.Attribution.license-grimwild')"></p>
            </div>
            <div>
                <!-- <p v-html="t('Home.Attribution.license-portraits')"></p> -->
                <p v-html="t('Home.Attribution.license-icons')"></p>
                <img
                    src="@/assets/images/licensing/crafted-for-grimwild.png"
                    alt="Crafted for Grimwild"
                    class="crafted-for-grimwild"
                />
            </div>
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
    width: 100%;
    border-top: 1px solid var(--surface-alt);
    background-color: var(--surface);
}

.footer__content {
    max-width: 96rem;
    margin: 0 auto;
    padding: 1.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    p,
    a {
        font-size: 1.4rem;
        line-height: 1.2;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }
}

.logo-and-olin {
    h1 {
        font-size: 2.4rem;
    }

    h2 {
        font-size: 2.4rem;
        opacity: 0.4;
        text-transform: uppercase;
    }
}

img.crafted-for-grimwild {
    margin-top: 1rem;
    width: 12rem;
}

@media (max-width: 768px) {
    .footer__content {
        grid-template-columns: 1fr;

        // Put a divider between the columns
        > div:not(:last-child)::after {
            content: '';
            border-bottom: 0.2rem solid var(--surface-alt);
            width: 6.4rem;
            margin: 1rem auto;
            font-size: 1.2rem;
        }
    }
}
</style>
