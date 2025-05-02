<template>
    <Card>
        <h3>{{ adventurer.name }}</h3>
        <p>{{ adventurer.description }}</p>
        <div class="flex flex-wrap">
            <Badge color="var(--surface-alt)" :useLightText="true">
                <span>
                    {{
                        t('Adventurer-card.created-at', {
                            date: new Date(
                                adventurer.createdAt
                            ).toLocaleDateString()
                        })
                    }}
                </span>
            </Badge>
            <Badge color="var(--surface-alt)" :useLightText="true">
                <span>
                    {{
                        t('Adventurer-card.updated-at', {
                            date: new Date(
                                adventurer.updatedAt
                            ).toLocaleDateString()
                        })
                    }}
                </span>
            </Badge>
        </div>
        <Button @click="onClickEditAdventurer">
            <i class="fas fa-edit"></i>
            <span>{{ t('Adventurer-card.edit-adventurer') }}</span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { t } from '@/i18n/locale';
import { PageName, router } from '@/router';
import Badge from './ui/Badge.vue';

const props = defineProps({
    adventurer: {
        type: Object,
        required: true
    }
});

function onClickEditAdventurer() {
    // Redirect to the adventurer page with the adventurer ID
    router.push({
        name: PageName.ADVENTURER,
        params: { id: props.adventurer.id }
    });
}
</script>

<style scoped lang="scss"></style>
