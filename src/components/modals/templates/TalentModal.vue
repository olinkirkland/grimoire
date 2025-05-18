<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader close-button>
                <h2>{{ t('talent') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="talent-info">
                <h3>{{ talentTitle }}</h3>
                <h2 v-if="talentSource">{{ getSourceLabel(talentSource) }}</h2>
                <p v-html="talentDescription"></p>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import talentsData from '@/assets/data/talents.json';
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import { t } from '@/i18n/locale';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed } from 'vue';

const props = defineProps<{
    talent: string;
}>();

const talentSource = computed(() => {
    return talentsData.find((talent) => talent.id === props.talent)?.source;
});

const talentPage = computed(() => {
    return talentsData.find((talent) => talent.id === props.talent)?.page || -1;
});

const talentTitle = computed(() => {
    return t(`Step.Talents.${capitalizeFirstLetter(props.talent)}.name`);
});

const talentDescription = computed(() => {
    return t(`Step.Talents.${capitalizeFirstLetter(props.talent)}.description`);
});

function getSourceLabel(source: string): string {
    const path = t(`Step.Path.${capitalizeFirstLetter(source)}.name`);
    return t('Step.Talents.talent-by-path', { path });
}
</script>

<style scoped lang="scss">
.talent-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 48rem;

    h2 {
        font-style: italic;
        font-size: 1.4rem;
        color: var(--surface-alt);
        margin-top: -0.2rem;
        margin-bottom: 0.8rem;
    }
}
</style>
