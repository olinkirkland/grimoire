import { v4 as uuid } from 'uuid';

export default class Adventurer {
    id: string;
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;
    portraitId: string;

    constructor(name: string) {
        this.id = uuid();
        this.name = name;
        this.description = '';
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.portraitId = '5bd09599-3199-44a1-adad-7e0c5926ce9d';
    }

    static saveToFile(fileName: string, adventurer: Adventurer) {
        console.log('Saving adventurer to file...');
        // Save the adventurer to a file
        const adventurerData = JSON.stringify(adventurer, null, 2);
        const blob = new Blob([adventurerData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
