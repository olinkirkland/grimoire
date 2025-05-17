<template>
    <StepFrame>
        <ReferenceCard :page="50">
            <p v-html="t('Step.Background.instructions')"></p>
        </ReferenceCard>
        <Card class="background">
            <section>
                <InputGroup v-model="adventurer[currentStep].name" :placeholder="t('Step.Background.placeholder')">
                    <span>{{ t('Step.Background.label') }}</span>
                </InputGroup>
            </section>
            <section>
                <p v-html="t('Step.Background.Wises.instructions')"></p>
                <ul class="wises">
                    <li>
                        <InputGroup
                            v-model="adventurer[currentStep].wises[0]"
                            :placeholder="t('Step.Background.Wises.placeholder-1')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer[currentStep].wises[1]"
                            :placeholder="t('Step.Background.Wises.placeholder-2')"
                        >
                        </InputGroup>
                    </li>
                    <li>
                        <InputGroup
                            v-model="adventurer[currentStep].wises[2]"
                            :placeholder="t('Step.Background.Wises.placeholder-3')"
                        >
                        </InputGroup>
                    </li>
                </ul>
            </section>

            <TableCard :items="backgroundsData">
                <template #item="{ item }">
                    <div class="background-item" @click="onClickBackground(item)">
                        <p v-html="makeBackgroundNamesString(item.names)"></p>
                        <p v-html="makeBackgroundWisesString(item.wises)"></p>
                    </div>
                </template>
            </TableCard>
        </Card>
    </StepFrame>
</template>

<script setup lang="ts">
import Adventurer from '@/adventurer';
import backgroundsData from '@/assets/data/backgrounds.json';
import { t } from '@/i18n/locale';
import InputGroup from '../ui/InputGroup.vue';

const props = defineProps({
    adventurer: {
        type: Object as () => Adventurer,
        required: true
    },
    step: {
        type: String as () => 'background' | 'background-2',
        default: false
    }
});

const currentStep: 'background' | 'heritage' = props.step === 'background' ? 'background' : 'heritage';

function makeBackgroundNamesString(names: string[]) {
    const tNames = names.map((name) => t(`Step.Background.Names.${name}`));
    return t(`Step.Background.list-template-1`, {
        name1: tNames[0],
        name2: tNames[1],
        name3: tNames[2]
    });
}

function makeBackgroundWisesString(wises: string[]) {
    const tWises = wises.map((wise) => t(`Step.Background.Wises.${wise}`));
    return t(`Step.Background.list-template-2`, {
        wise1: tWises[0],
        wise2: tWises[1],
        wise3: tWises[2]
    });
}

function onClickBackground(background: any, name?: string) {
    props.adventurer[currentStep].name = t(`Step.Background.Names.${background.names[0]}`);
    props.adventurer[currentStep].wises = background.wises.map((wise: string) => t(`Step.Background.Wises.${wise}`));
}
</script>

<style scoped lang="scss">
.background {
    width: 100%;
    .input-group {
        width: 100%;
        max-width: 100%;
    }

    > section:not(:last-child) {
        margin-bottom: 0.8rem;
    }
}

.wises {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.background-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

@media (max-width: 768px) {
    .wises {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .background-item {
        display: flex;
        flex-direction: column;

        overflow: hidden;
        text-overflow: ellipsis;
        * {
            white-space: wrap;
        }
    }
}
</style>
