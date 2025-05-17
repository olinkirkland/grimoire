<template>
    <StepFrame>
        <Card>
            <p v-html="$t('Step.Review.instructions')"></p>

            <!-- Colors -->
            <ButtonBar class="color-bar">
                <Button
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
                    <Button @click="onClickSaveImage">
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
                        v-for="font in fonts"
                        :key="font"
                        @click="onClickChangeFont(font)"
                        :pressed="props.adventurer.options.font === font"
                    >
                        {{ font }}
                    </Button>
                </ButtonBar>
            </div>

            <Card class="preview-card">
                <img ref="sheetPreview" class="preview" />
            </Card>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { t } from '@/i18n/locale';
import { BASE_URL } from '@/router';
import { paintSheet } from '@/sheet-painter';
import { encodeURI } from '@/utils/adventurer-util';
import { toFileName } from '@/utils/naming-util';
import { onMounted, ref } from 'vue';
import StepFrame from '../StepFrame.vue';
import Button from '../ui/Button.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const showCopyNotification = ref(false);
const sheetDataURL = ref('');
const sheetPreview = ref<HTMLImageElement | null>(null);

const fonts = ['Arvo', 'Courier New'];
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

onMounted(() => {
    generateImage();
});

function onClickChangeColor(color: string) {
    props.adventurer.options.color = color;
    generateImage();
}

function onClickChangeFont(font: string) {
    props.adventurer.options.font = font;
    generateImage();
}

async function generateImage() {
    // TODO: Show the loading spinner
    const canvas = await paintSheet(props.adventurer);
    if (!canvas) return;

    sheetDataURL.value = canvas.toDataURL('image/png');
    if (!sheetPreview.value) return;
    sheetPreview.value!.src = sheetDataURL.value;
    sheetPreview.value!.style.opacity = '1';
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
}

function onClickSaveImage() {
    if (!props.adventurer.path) return;
    const fileName = toFileName(props.adventurer.name);
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = sheetDataURL.value.replace('image/png', 'image/octet-stream');
    link.click();
    link.remove();
}
</script>

<style scoped lang="scss">
.preview-card {
    width: 100%;
    min-height: 8rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-shadow: var(--shadow-sm);
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
