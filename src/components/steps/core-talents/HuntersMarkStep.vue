<template>
    <StepFrame>
        <ReferenceCard :page="68" floating-reference-tip>
            <div>
                <h2>{{ t('Step.Core-talent.heading') }}</h2>
                <h3>◈ {{ t(`Step.Hunters-mark.title`) }}</h3>
                <p v-html="t(`Step.Hunters-mark.description`)"></p>
                <Card class="growth">
                    <p>
                        <strong>{{ t('Step.Core-talent.growth') }}</strong
                        >: {{ t('Step.Hunters-mark.growth') }}
                    </p>
                </Card>
            </div>
        </ReferenceCard>
        <Card class="favorite-traps">
            <p v-html="t('Step.Hunters-mark.Traps.instructions')"></p>
            <div class="favorite-traps-inputs">
                <InputGroup
                    v-model="adventurer.talentsData[Step.HUNTERS_MARK].traps[0]"
                    :placeholder="t('Step.Hunters-mark.Traps.placeholder-1')"
                >
                    {{ t('Step.Hunters-mark.Traps.label') }} #1
                    <template #append>
                        <Button @click="adventurer.talentsData[Step.HUNTERS_MARK].traps[0] = generateRandomTrap()">
                            <i class="fas fa-random"></i>
                        </Button>
                    </template>
                </InputGroup>
                <InputGroup
                    v-model="adventurer.talentsData[Step.HUNTERS_MARK].traps[1]"
                    :placeholder="t('Step.Hunters-mark.Traps.placeholder-2')"
                >
                    {{ t('Step.Hunters-mark.Traps.label') }} #2
                    <template #append>
                        <Button @click="adventurer.talentsData[Step.HUNTERS_MARK].traps[1] = generateRandomTrap()">
                            <i class="fas fa-random"></i>
                        </Button>
                    </template>
                </InputGroup>
            </div>
        </Card>
        <Card class="signs-of-weakness">
            <p v-html="t('Step.Hunters-mark.Signs-of-weakness.instructions')"></p>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import trapsData from '@/assets/data/traps.json';
import { t } from '@/i18n/locale';
import { Step } from '@/step';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    }
});

function generateRandomTrap() {
    let effect = '';
    let trigger = '';

    Object.keys(trapsData).forEach((key) => {
        const arr: string[] = trapsData[key as keyof typeof trapsData];
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomItem = arr[randomIndex];
        switch (key) {
            case 'effects':
                effect = randomItem;
                break;
            case 'triggers':
                trigger = randomItem;
                break;
        }
    });

    return t('Step.Hunters-mark.Traps.template', {
        effect: t(`Step.Hunters-mark.Traps.Effects.${effect}`),
        trigger: t(`Step.Hunters-mark.Traps.Triggers.${trigger}`)
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

.favorite-traps {
    display: flex;
    flex-direction: column;
}

.favorite-traps-inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
}

@media (max-width: 768px) {
    .favorite-traps {
        display: flex;
        flex-direction: column;
    }

    .favorite-traps-inputs {
        grid-template-columns: 1fr;
    }
}
</style>
