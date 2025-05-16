<template>
    <StepFrame>
        <Card>
            <p v-html="$t('Step.Review.instructions')"></p>
            <div class="flex center">
                <Button @click="onClickCopyURI" :disabled="showNotification">
                    <i
                        class="fas"
                        :class="{
                            'fa-check': showNotification,
                            'fa-copy': !showNotification
                        }"
                    ></i>
                    {{ $t(showNotification ? 'Step.Review.copied' : 'Step.Review.Share.label') }}
                </Button>
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { BASE_URL } from '@/router';
import { encodeURI } from '@/utils/adventurer-util';
import { ref } from 'vue';
import StepFrame from '../StepFrame.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const showNotification = ref(false);

function onClickCopyURI() {
    const encodedString = encodeURI(props.adventurer);
    const textArea = document.createElement('textarea');
    textArea.value = `${window.location.origin}${BASE_URL}i/${encodedString}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 2000);
}
</script>

<style scoped lang="scss"></style>
