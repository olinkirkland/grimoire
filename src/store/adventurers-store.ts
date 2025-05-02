import Adventurer from '@/adventurer';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAdventurersStore = defineStore('adventurers', () => {
    const adventurers = ref<Adventurer[]>([]);

    // Watch for changes and save to localStorage
    watch(
        adventurers,
        (newAdventurers) => {
            localStorage.setItem('adventurer', JSON.stringify(newAdventurers));
        },
        { deep: true }
    );

    // Load adventurers from localStorage
    function loadAdventurersFromLocalStorage(): void {
        const storedAdventurers = localStorage.getItem('adventurers');
        adventurers.value = storedAdventurers
            ? JSON.parse(storedAdventurers)
            : [];
    }

    // Estimate bytes used by adventurers in localStorage
    function bytesUsedEstimate() {
        const jsonString = JSON.stringify(adventurers.value);
        const bytesCount = new Blob([jsonString]).size;
        return bytesCount;
    }

    // Get an adventurer by ID
    function getAdventurer(id: string): Adventurer | undefined {
        return adventurers.value.find((adventurer) => adventurer.id === id);
    }

    // Add a new adventurer
    function addAdventurer(adventurer: Adventurer): void {
        adventurers.value.push(adventurer);
    }

    // Remove a adventurer by ID
    function removeAdventurer(id: string): void {
        adventurers.value = adventurers.value.filter(
            (adventurer) => adventurer.id !== id
        );
    }

    return {
        adventurers: adventurers,
        loadAdventurersFromLocalStorage,
        bytesUsedEstimate,
        getAdventurer,
        addAdventurer,
        removeAdventurer
    };
});
