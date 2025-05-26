<template>
    <StepFrame>
        <ReferenceCard :page="74" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Pact.title`) }}</h3>
                <p v-html="t(`Step.Pact.description`)"></p>
                <div class="gifts-obligations">
                    <Card class="gifts">
                        <p v-html="t('Step.Pact.gifts')"></p>
                    </Card>
                    <Card class="obligations">
                        <p v-html="t('Step.Pact.obligations')"></p>
                    </Card>
                </div>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Pact.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="patron-creation">
            <p v-html="t('Step.Pact.Patron-creation.instructions')"></p>
            <InputGroup
                v-model="adventurer.talentsData[Step.PACT].patron.name"
                :placeholder="t('Step.Pact.Name.placeholder')"
            >
                {{ t('Step.Pact.Name.label') }}
            </InputGroup>
            <NamePicker
                id="patron-name"
                :name-tables="nameTablesData"
                :name-category-label-function="(item: string) => t(`Step.Pact.Name.Tables.${item}`)"
                v-model:name="adventurer.talentsData[Step.PACT].patron.name"
            >
                <p v-html="t('Step.Pact.Name.instructions')"></p>
            </NamePicker>
            <div class="trappings">
                <div>
                    <p v-html="t('Step.Pact.Communication.instructions')"></p>
                    <InputGroup
                        v-model="adventurer.talentsData[Step.PACT].patron.communication"
                        :placeholder="t('Step.Pact.Communication.placeholder')"
                    >
                    </InputGroup>
                </div>
                <div>
                    <p v-html="t('Step.Pact.Color.instructions')"></p>
                    <InputGroup
                        v-model="adventurer.talentsData[Step.PACT].patron.color"
                        :placeholder="t('Step.Pact.Color.placeholder')"
                    >
                    </InputGroup>
                </div>
                <div>
                    <p v-html="t('Step.Pact.Followers.instructions')"></p>
                    <ButtonBar class="followers" full-width>
                        <!-- Many, Some, Just me -->
                        <Button
                            @click="adventurer.talentsData[Step.PACT].patron.followers = 'many'"
                            :pressed="adventurer.talentsData[Step.PACT].patron.followers === 'many'"
                        >
                            {{ t('Step.Pact.Followers.many') }}
                        </Button>
                        <Button
                            @click="adventurer.talentsData[Step.PACT].patron.followers = 'some'"
                            :pressed="adventurer.talentsData[Step.PACT].patron.followers === 'some'"
                        >
                            {{ t('Step.Pact.Followers.some') }}
                        </Button>
                        <Button
                            @click="adventurer.talentsData[Step.PACT].patron.followers = 'just-me'"
                            :pressed="adventurer.talentsData[Step.PACT].patron.followers === 'just-me'"
                        >
                            <span class="span ellipsis">
                                {{ t('Step.Pact.Followers.just-me') }}
                            </span>
                        </Button>
                    </ButtonBar>
                </div>
            </div>
            <TextAreaGroup
                v-model="adventurer.talentsData[Step.PACT].patron.details"
                :placeholder="t('Step.Pact.Details.placeholder')"
            >
                {{ t('Step.Pact.Details.label') }}
            </TextAreaGroup>
            <div class="crucibles">
                <CrucibleCard
                    :title="t('Step.Pact.Patron-creation.Crucibles.Nature.label')"
                    :items="patronTrappingsData.nature"
                    :label-function="(item: string) => t(`Step.Pact.Patron-creation.Crucibles.Nature.${item}`)"
                    v-model="adventurer.talentsData[Step.PACT].patron.patronCrucibles.nature"
                />
                <CrucibleCard
                    :title="t('Step.Pact.Patron-creation.Crucibles.Desires.label')"
                    :items="patronTrappingsData.desires"
                    :label-function="(item: string) => t(`Step.Pact.Patron-creation.Crucibles.Desires.${item}`)"
                    v-model="adventurer.talentsData[Step.PACT].patron.patronCrucibles.desires"
                />
            </div>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import nameTablesData from '@/assets/data/patron-name-tables.json';
import patronTrappingsData from '@/assets/data/patron-trappings.json';
import TextAreaGroup from '@/components/ui/TextAreaGroup.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});
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

.gifts-obligations {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;
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

.trappings {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem 0;
    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

@media (max-width: 768px) {
    .gifts-obligations {
        grid-template-columns: 1fr;
    }

    .trappings {
        grid-template-columns: 1fr;
    }

    .crucibles {
        grid-template-columns: 1fr;
    }
}
</style>
