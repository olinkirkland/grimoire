<template>
    <footer>
        <div class="footer__content glass">
            <div class="logo-and-olin">
                <h1 class="logo">
                    {{ t('Brand.name') }}
                    <span class="version">v{{ version }}</span>
                </h1>
                <p v-html="t('Home.Attribution.changelog')"></p>
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
                <div class="crafted-for">
                    <li>
                        <!-- Grimwild license -->
                        <img
                            src="@/assets/images/licensing/crafted-for-grimwild.png"
                            alt="Crafted for Grimwild"
                            class="crafted-for-grimwild"
                        />
                    </li>
                    <li>
                        <!-- Moxie license -->
                        <img
                            src="@/assets/images/licensing/made-with-moxie.png"
                            alt="Moxie"
                            class="crafted-for-grimwild"
                        />
                    </li>
                </div>
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
    // ModalController.open();
}
</script>

<style scoped lang="scss">
footer {
    width: 100%;
    padding: 1rem;
}

.footer__content {
    border-radius: 5px;
    box-shadow: var(--shadow-sm);
    max-width: 96rem;
    margin: 0 auto;
    padding: 1.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    p,
    a {
        font-size: 1.4rem;
        line-height: 1.4;
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

.crafted-for {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    margin-top: 1rem;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

@media (max-width: 768px) {
    .footer__content {
        grid-template-columns: 1fr;

        // Put a divider between the columns
        > div:not(:last-child)::after {
            content: '';
            border-bottom: 1px solid var(--surface-alt);
            opacity: 0.4;
            width: 100%;
            margin-top: 1.6rem;
        }

        p,
        a {
            font-size: 1.6rem;
            line-height: 1.4;
        }
    }
}
</style>
