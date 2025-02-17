// TODO: Remove this and import it from the models folder
type Adventurer = {};

export function saveAdventurer(adventurer: Adventurer) {
    // TODO
    // const id = `adventurer-${adventurer.id}`;
}

export function loadSavedAdventurer(id: string): Adventurer {
    // TODO
    // const allLocalStorageKeys = Object.keys(localStorage).filter((key) =>
    //     key.startsWith('adventurer-')
    // );
    return {};
}

export function deleteScoundrel(id: string) {
    localStorage.removeItem(`adventurer-${id}`);
}
