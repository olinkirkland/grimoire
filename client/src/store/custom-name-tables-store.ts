import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useCustomNameTablesStore = defineStore('custom-name-tables', () => {
    const customNameTables = ref<Record<string, string[]>>({});

    // Watch for changes and save to localStorage
    watch(
        customNameTables,
        (newCustomNameTables) => {
            localStorage.setItem('custom-name-tables', JSON.stringify(newCustomNameTables));
        },
        { deep: true }
    );

    // Load custom name tables from localStorage
    function loadCustomNameTablesFromLocalStorage(): void {
        const storedCustomNameTables = localStorage.getItem('custom-name-tables');
        customNameTables.value = storedCustomNameTables ? JSON.parse(storedCustomNameTables) : [];
    }

    // Add a new custom name table
    function addCustomNameTable(id: string, names: string[]): void {
        customNameTables.value = { ...customNameTables.value, [id]: names };
    }

    // Remove a custom name table by id
    function removeCustomNameTable(id: string): void {
        delete customNameTables.value[id];
    }

    return {
        customNameTables,
        loadCustomNameTablesFromLocalStorage,
        addCustomNameTable,
        removeCustomNameTable
    };
});
