<template>
    <StepFrame>
        <Card>
            <p v-html="$t('Step.Review.instructions')"></p>

            <!-- Colors -->
            <ButtonBar class="color-bar">
                <Button
                    :disabled="!adventurer.path"
                    v-for="color in colors"
                    :key="color.name"
                    @click="onClickChangeColor(color.value)"
                    :pressed="color.value === props.adventurer.options.color"
                >
                    <div class="color-box" :style="{ backgroundColor: color.value }"></div>
                    <span class="hide-on-mobile"> {{ t(`Color.${color.name}`) }}</span>
                </Button>
            </ButtonBar>

            <div class="flex wrap full-width">
                <!-- Export -->
                <div class="share">
                    <Button @click="onClickSaveImage" :disabled="!adventurer.path">
                        <i class="fas fa-download"></i>
                        {{ $t('Step.Review.Save.label') }}
                    </Button>
                    <Button @click="onClickCopyURI" :disabled="showCopyNotification">
                        <i
                            class="fas"
                            :class="{
                                'fa-check': showCopyNotification,
                                'fa-copy': !showCopyNotification
                            }"
                        ></i>
                        {{ $t(showCopyNotification ? 'Step.Review.copied' : 'Step.Review.Share.label') }}
                    </Button>
                </div>

                <!-- Fonts -->
                <ButtonBar class="font-bar">
                    <Button
                        :disabled="!adventurer.path"
                        class="font-button"
                        v-for="font in fonts"
                        :key="font"
                        @click="onClickChangeFont(font.value)"
                        :pressed="props.adventurer.options.font === font.value"
                    >
                        <span :style="{ fontFamily: font.value }"> {{ font.name }}</span>
                    </Button>
                </ButtonBar>
            </div>

            <Card class="preview-card" v-if="sheetDataURL">
                <div class="loader" v-if="isLoading">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <img ref="sheetPreview" class="preview" :class="{ 'is-loading': isLoading }" />
            </Card>
        </Card>

        <Card v-if="!adventurer.path" glass>
            <p v-html="t('Step.Review.Error.instructions')"></p>
            <Button @click="onClickGoToPath" primary>
                <i class="fas fa-arrow-left"></i>
                <span>{{ t('Step.Review.Error.button') }}</span>
            </Button>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
import { paintSheet } from '@/sheet-painter';
import { Step } from '@/step';
import { trackEvent } from '@/tracker';
import { encodeURI } from '@/utils/adventurer-util';
import { toFileName } from '@/utils/string-util';
import { onMounted, ref } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    },
    changeStep: {
        type: Function as unknown as () => (step: string) => void,
        required: true
    }
});

const showCopyNotification = ref(false);
const sheetDataURL = ref('');
const sheetPreview = ref<HTMLImageElement | null>(null);

const fonts = [
    {
        name: 'Open Sans',
        value: 'Open Sans'
    },
    {
        name: 'Gummy',
        value: 'Sour Gummy'
    },
    {
        name: 'Fraunces',
        value: 'Fraunces'
    }
];

const colors = [
    {
        name: 'midnight',
        value: '#1a1a1a'
    },
    {
        name: 'forest',
        value: '#717854'
    },
    {
        name: 'blood',
        value: '#7a2727'
    },
    {
        name: 'gold',
        value: '#ab8450'
    },
    {
        name: 'mud',
        value: '#826262'
    },
    {
        name: 'bone',
        value: '#7a6c63'
    },
    {
        name: 'tapestry',
        value: '#4f3d61'
    }
];

const isLoading = ref(true);

onMounted(() => {
    generateImage();
});

function onClickGoToPath() {
    props.changeStep(Step.PATH);
}

function onClickChangeColor(color: string) {
    props.adventurer.options.color = color;
    generateImage();
}

function onClickChangeFont(font: string) {
    props.adventurer.options.font = font;
    generateImage();
}

async function generateImage() {
    isLoading.value = true;

    // We're painting the sheet twice to ensure the font is loaded
    await paintSheet(props.adventurer);
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 500);
    });
    const canvas = await paintSheet(props.adventurer);
    if (!canvas) return;

    sheetDataURL.value = canvas.toDataURL('image/png');
    if (!sheetPreview.value) return;
    sheetPreview.value!.src = sheetDataURL.value;
    sheetPreview.value!.style.opacity = '1';

    sheetPreview.value!.style.transform = 'scale(1)';
    isLoading.value = false;
}

function onClickCopyURI() {
    const encodedString = encodeURI(props.adventurer);
    const textArea = document.createElement('textarea');
    textArea.value = `${window.location.origin}${BASE_URL}i/${encodedString}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopyNotification.value = true;
    setTimeout(() => {
        showCopyNotification.value = false;
    }, 2000);

    trackEvent('copy-uri', {
        name: props.adventurer.name,
        path: props.adventurer.path,
        stats: {
            brawn: props.adventurer.stats.brawn,
            agility: props.adventurer.stats.agility,
            wits: props.adventurer.stats.wits,
            presence: props.adventurer.stats.presence
        },
        talents: props.adventurer.talents
    });
}

function onClickSaveImage() {
    if (!props.adventurer.path) return;
    const fileName = toFileName(props.adventurer.name);
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = sheetDataURL.value.replace('image/png', 'image/octet-stream');
    link.click();
    link.remove();

    trackEvent('save-image', {
        name: props.adventurer.name,
        path: props.adventurer.path,
        stats: {
            brawn: props.adventurer.stats.brawn,
            agility: props.adventurer.stats.agility,
            wits: props.adventurer.stats.wits,
            presence: props.adventurer.stats.presence
        },
        talents: props.adventurer.talents
    });
}
</script>

<style scoped lang="scss">
.preview-card {
    display: flex;
    width: 100%;
    min-height: 16rem;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-shadow: var(--shadow-sm);

    > .loader {
        position: relative;
        height: 2.4rem;
        width: 2.4rem;
        > i {
            position: absolute;
            font-size: 2.4rem;
            color: var(--text);
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
        }
    }

    .is-loading {
        opacity: 0.2 !important;
    }
}

.preview {
    width: 100%;
    transition: all 0.2s;
}

.share {
    display: flex;
    gap: 1rem;
}

.color-box {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 100%;
    border: 1px solid var(--surface-border);
}

@media (max-width: 768px) {
    .share {
        width: 100%;
        flex-direction: column;
        > * {
            width: 100%;
            :deep(.btn__content) {
                justify-content: center;
            }
        }
    }
}
</style>
