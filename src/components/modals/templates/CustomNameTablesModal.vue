<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader closeButton>
                <h2>{{ t('Modals.Custom-name-tables.title') }}</h2>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="custom-name-tables">
                <Card>
                    <p v-html="t('Modals.Custom-name-tables.instructions')"></p>
                    <div class="flex wrap">
                        <Button @click="onClickChooseFile" primary>
                            <span>{{ t('Modals.Custom-name-tables.import') }}</span>
                        </Button>
                        <Button @click="onClickDownloadExample">
                            <i class="fas fa-download"></i>
                            <span>{{ t('Modals.Custom-name-tables.download') }}</span>
                        </Button>
                    </div>
                    <TableCard
                        :title="t('Modals.Custom-name-tables.table-title')"
                        :items="customNameTables"
                        v-if="customNameTables.length > 0"
                    >
                        <template #item="{ item }">
                            <div class="table-item">
                                <span>{{ item.id }}</span>
                                <Button @click="onClickRemoveTable(item.id)" icon mini>
                                    <i class="fas fa-trash"></i>
                                </Button>
                            </div>
                        </template>
                    </TableCard>
                    <p v-else>
                        <em>{{ t('Modals.Custom-name-tables.no-tables') }}</em>
                    </p>
                </Card>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import nameTableExampleData from '@/assets/data/name-table-example.json';
import ModalFrame from '@/components/modals/ModalFrame.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import { t } from '@/i18n/locale';
import { getUniqueName } from '@/utils/naming-util';
import { onMounted, ref } from 'vue';

type CustomNameTable = {
    id: string;
    names: string[];
    createdAt: number;
};

// Import the custom name tables from the local storage
onMounted(() => {
    const storedNameTables = localStorage.getItem('custom-name-tables');
    if (storedNameTables) customNameTables.value = JSON.parse(storedNameTables);
    else customNameTables.value = [];
});

const customNameTables = ref<CustomNameTable[]>([]);

function onClickDownloadExample() {
    // Create a blob from the example data and create a link to download it
    const blob = new Blob([JSON.stringify(nameTableExampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'name-table-example.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function onClickChooseFile() {
    // Choose a file and read it, then parse it as JSON and store it in the local storage
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
            input.remove();
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);

                const uniqueName = getUniqueName(
                    customNameTables.value.map((table) => table.id),
                    file.name.split('.')[0]
                );
                const customNameTable: CustomNameTable = {
                    id: uniqueName,
                    names: data,
                    createdAt: new Date().getTime()
                };
                customNameTables.value.push(customNameTable);
                localStorage.setItem('custom-name-tables', JSON.stringify(customNameTables.value));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        input.remove();
        reader.readAsText(file);
    };

    input.click();
}

function onClickRemoveTable(id: string) {
    // Remove the table from the local storage
    customNameTables.value = customNameTables.value.filter((table) => table.id !== id);
    localStorage.setItem('custom-name-tables', JSON.stringify(customNameTables.value));
}
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    display: flex;
    max-width: 64rem;
}

.custom-name-tables {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.table-card {
    max-height: 20rem;
}

.table-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 768px) {
    .card {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
