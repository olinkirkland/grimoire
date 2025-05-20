<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>{{ t(`Step.Talents.talent-by-path`, { path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`) }) }}</h2>
                <h3>⬦ {{ t(`Step.Herbalism.title`) }}</h3>
                <p v-html="t('Step.Talents.Herbalism.description')"></p>
            </div>
        </ReferenceCard>
        <Card glass v-if="prefixOrSuffix">
            <h3 class="full-width text-center">{{ combinedCrucibleName }}</h3>
        </Card>
        <Card>
            <div class="crucibles">
                <CrucibleCard
                    :items="herbalismData.prefixes"
                    :label-function="(item) => t(`Step.Herbalism.Crucibles.Prefixes.${item}`)"
                    :title="t('Step.Herbalism.Crucibles.Prefixes.title')"
                    v-model="adventurer.talentsData[Step.HERBALISM].crucibles.prefix"
                />
                <CrucibleCard
                    :items="herbalismData.suffixes"
                    :label-function="(item) => t(`Step.Herbalism.Crucibles.Suffixes.${item}`)"
                    :title="t('Step.Herbalism.Crucibles.Suffixes.title')"
                    v-model="adventurer.talentsData[Step.HERBALISM].crucibles.suffix"
                ></CrucibleCard>
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import herbalismData from '@/assets/data/herbalism.json';
import talentDefinitionsData from '@/assets/data/talents.json';
import CrucibleCard from '@/components/ui/CrucibleCard.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { capitalizeFirstLetter } from '@/utils/naming-util';
import { computed } from 'vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.HERBALISM)!;

const combinedCrucibleName = computed(() => {
    const prefix = props.adventurer.talentsData[Step.HERBALISM].crucibles.prefix;
    const suffix = props.adventurer.talentsData[Step.HERBALISM].crucibles.suffix;
    return capitalizeFirstLetter(
        `${prefix && t(`Step.Herbalism.Crucibles.Prefixes.${prefix}`)}${suffix && t(`Step.Herbalism.Crucibles.Suffixes.${suffix}`)}`
    );
});

const prefixOrSuffix = computed(() => {
    const prefix = props.adventurer.talentsData[Step.HERBALISM].crucibles.prefix;
    const suffix = props.adventurer.talentsData[Step.HERBALISM].crucibles.suffix;
    return prefix || suffix;
});
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.crucibles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    > .crucible {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .crucibles {
        grid-template-columns: 1fr;
    }
}
</style>
