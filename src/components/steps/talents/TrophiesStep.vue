<template>
    <StepFrame>
        <ReferenceCard :page="talent.page" floating-reference-tip>
            <div>
                <h2>
                    {{
                        t(`Step.Talents.talent-by-path`, {
                            path: t(`Step.Path.${capitalizeFirstLetter(talent.source)}.name`)
                        })
                    }}
                </h2>
                <h3>⬦ {{ t(`Step.Trophies.title`) }}</h3>
                <p v-html="t(`Step.Trophies.description`)"></p>
            </div>
        </ReferenceCard>
        <Card glass class="added-trophies-card">
            <ul v-if="adventurer.talentsData[Step.TROPHIES].trophies.length">
                <Card v-for="(trophy, index) in adventurer.talentsData[Step.TROPHIES].trophies" class="added-trophy">
                    <div>
                        <h3>{{ trophy.name }}</h3>
                        <p v-html="trophy.description"></p>
                    </div>
                    <Button @click="onClickRemoveTrophy(index)">
                        <i class="fas fa-trash"></i>
                    </Button>
                </Card>
            </ul>
            <p v-else>
                <em>{{ t('Step.Trophies.empty') }}</em>
            </p>
        </Card>
        <Card>
            <ButtonBar>
                <InputGroup :placeholder="t(`Step.Trophies.Name.placeholder`)" v-model="nameInput">
                    {{ t('Step.Trophies.Name.label') }}
                </InputGroup>
                <Button @click="onClickAddTrophy" :disabled="!nameInput || !descriptionInput">
                    <i class="fas fa-plus"></i>
                </Button>
            </ButtonBar>
            <InputGroup :placeholder="t(`Step.Trophies.Description.placeholder`)" v-model="descriptionInput">
                {{ t('Step.Trophies.Description.label') }}
            </InputGroup>
            <p v-html="t(`Step.Trophies.instructions`)"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import talentDefinitionsData from '@/assets/data/talents.json';
import InputGroup from '@/components/ui/InputGroup.vue';
import { t } from '@/i18n/locale';
import { Step } from '@/step';
import { ref } from 'vue';
import { capitalizeFirstLetter } from '@/utils/string-util';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

const talent = talentDefinitionsData.find((talent) => talent.id === Step.TROPHIES)!;

const nameInput = ref<string>('');
const descriptionInput = ref<string>('');

function onClickAddTrophy() {
    if (!nameInput.value || !descriptionInput.value) return;
    props.adventurer.talentsData[Step.TROPHIES].trophies.push({
        name: nameInput.value,
        description: descriptionInput.value
    });
    nameInput.value = '';
    descriptionInput.value = '';
}

function onClickRemoveTrophy(index: number) {
    props.adventurer.talentsData[Step.TROPHIES].trophies.splice(index, 1);
}
</script>

<style scoped lang="scss">
:deep(.card--reference h2) {
    font-style: italic;
    color: var(--surface-alt);
}

.button-bar {
    width: 100%;
}

.added-trophies-card {
    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        > .card {
            flex-direction: row;
            justify-content: space-between;
            div {
                > h3 {
                    font-size: 1.6rem;
                }
                > p {
                    margin-top: -0.4rem;
                    font-style: italic;
                    color: var(--surface-alt);
                }
            }
        }
    }
}

@media (max-width: 768px) {
}
</style>
