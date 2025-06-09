<template>
    <StepFrame>
        <ReferenceCard :page="146" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Ingenuity.title`) }}</h3>
                <p v-html="t(`Step.Ingenuity.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong>
                        : {{ t('Step.Ingenuity.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="arcana">TODO: ARCANA</Card>
        <Card class="making-up-gadgets">
            <p v-html="t('Step.Ingenuity.Making-up-gadgets.instructions')"></p>
            <InputGroup
                v-model="adventurer.talentsData.ingenuity.babble"
                :placeholder="t('Step.Ingenuity.Making-up-gadgets.placeholder')"
            >
                <span>{{ t('Step.Ingenuity.Making-up-gadgets.label') }}</span>
                <template #append>
                    <Button @click="generateGadgetDescription">
                        <i class="fas fa-magic"></i>
                    </Button>
                </template>
            </InputGroup>
            <p
                class="text-center"
                v-html="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.template-instructions')"
            ></p>
            <div class="crucibles">
                <CrucibleCard
                    ref="prefixesCrucible"
                    :title="t('Step.Ingenuity.Making-up-gadgets.Babble-crucibles.prefixes')"
                    :items="prefixesData"
                    :label-function="
                        (item: string) => t(`Step.Ingenuity.Making-up-gadgets.Babble-crucibles.Prefixes.${item}`) + '-'
                    "
                    v-model="adventurer.talentsData.ingenuity.babbleCrucibles.prefix"
                ></CrucibleCard>
                <CrucibleCard
                    ref="suffixesCrucible"
                    :title="t('Step.Ingenuity.Making-up-gadgets.Babble-crucibles.suffixes')"
                    :items="suffixesData"
                    :label-function="
                        (item: string) => '-' + t(`Step.Ingenuity.Making-up-gadgets.Babble-crucibles.Suffixes.${item}`)
                    "
                    v-model="adventurer.talentsData.ingenuity.babbleCrucibles.suffix"
                ></CrucibleCard>
            </div>
            <TableGroup>
                <!-- Material -->
                <TableCard
                    :title="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.material')"
                    :items="gadgetData.material"
                >
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{
                            t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Material.${item}`)
                        }}</span>
                    </template>
                </TableCard>
                <!-- Power -->
                <TableCard
                    :title="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.power')"
                    :items="gadgetData.power"
                >
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{
                            t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Power.${item}`)
                        }}</span>
                    </template>
                </TableCard>
                <!-- Action -->
                <TableCard
                    :title="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.action')"
                    :items="gadgetData.action"
                >
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{
                            t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Action.${item}`)
                        }}</span>
                    </template>
                </TableCard>
                <!-- Flaw -->
                <TableCard
                    :title="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.flaw')"
                    :items="gadgetData.flaw"
                >
                    <template #item="{ item }">
                        <span class="ellipsis text-center">{{
                            t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Flaw.${item}`)
                        }}</span>
                    </template>
                </TableCard>
            </TableGroup>
            <p class="gadget-examples" v-html="t('Step.Ingenuity.Making-up-gadgets.Gadget-description.examples')"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import { prefixes as prefixesData, suffixes as suffixesData } from '@/assets/data/technobabble.json';
import CrucibleCard from '@/components/ui/CrucibleCard.vue';
import { t } from '@/i18n/locale';
import { defineProps, ref } from 'vue';
import gadgetData from '@/assets/data/gadget.json';
import { capitalizeFirstLetter } from '@/utils/string-util';
const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function generateGadgetDescription() {
    // Randomize the prefix and suffix from the adventurer's talents data
    const prefix = (props.adventurer.talentsData.ingenuity.babbleCrucibles.prefix =
        prefixesData[Math.floor(Math.random() * prefixesData.length)]);
    const suffix = (props.adventurer.talentsData.ingenuity.babbleCrucibles.suffix =
        suffixesData[Math.floor(Math.random() * suffixesData.length)]);

    const gadgetName = capitalizeFirstLetter(
        t(`Step.Ingenuity.Making-up-gadgets.Babble-crucibles.Prefixes.${prefix}`) +
            t(`Step.Ingenuity.Making-up-gadgets.Babble-crucibles.Suffixes.${suffix}`)
    );

    const material = gadgetData.material[Math.floor(Math.random() * gadgetData.material.length)];
    const power = gadgetData.power[Math.floor(Math.random() * gadgetData.power.length)];
    const action = gadgetData.action[Math.floor(Math.random() * gadgetData.action.length)];
    const flaw = gadgetData.flaw[Math.floor(Math.random() * gadgetData.flaw.length)];

    props.adventurer.talentsData.ingenuity.babble = t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.template`, {
        name: gadgetName,
        material: t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Material.${material}`),
        power: t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Power.${power}`),
        action: t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Action.${action}`),
        flaw: t(`Step.Ingenuity.Making-up-gadgets.Gadget-description.Flaw.${flaw}`)
    });
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.card.growth {
    margin-top: 1rem;
    background-color: var(--surface);
}

.crucibles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    > * {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .crucibles {
        grid-template-columns: 1fr;
    }
}
</style>
