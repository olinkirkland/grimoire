import { v4 as uuid } from 'uuid';

export default class Adventurer {
    id: string;
    createdAt: number;
    updatedAt: number;

    portraitId: string;

    // Name
    name: string;
    playerName: string;

    // Backgrounds
    // Choose two backgrounds, each with three wises, that detail your heritage or professions, covering your tools of the trade and story details.
    backgrounds: string[];

    // Traits
    // Choose 2 you very much are and 1 you definitely aren't: brave, caring, confident, curious, gentle, honest, honorable, persistent, protective, quiet, rash, stubborn.
    traits: string[];

    // Desires
    // Choose 2 you truly desire and 1 you definitely don't: belonging, glory, harmony, honor, justice, knowledge, love, power, renown, thrills, wealth, wisdom.
    desires: string[];

    // Features
    // Write down three distinctive features, words or short phrases that others soon notice about you, like strong hands, kind eyes, or a gravelly voice.
    features: string[];

    // Path
    // Choose a path, gain its core talent, and pick either another talent from your path's list or a non-core talent from another path.
    path: string;

    // Talents
    // Talents are tracked in an array of strings. The character sheet gets bubbled in based on this.
    talents: string[];

    // Non-path talents & notes are stored in a string and rendered in the text box on the character sheet.
    nonPathTalentsAndNotes: string;

    // Talent Details
    // Talents sometimes have bubbles, checkboxes, or other stuff that needs to be tracked on the character sheet.
    talentDetails: {};

    // Stats
    // Begin with 1 in each stat, then assign 4 more points amongst them as you like, to a max of 3 in any single stat.
    stats: {
        brawn: number;
        agility: number;
        wits: number;
        presence: number;
    };

    // Arcs
    // Choose one or two character arcs to explore. Don't get too detailed—these will get fleshed out during play and can be changed anytime.
    arcs: string[];

    // Bonds
    // Describe your characters in detail. As you listen, choose one bond you have towards each PC, matching together an intensity and a nature of the bond.
    bonds: {
        name: string; // Name of the character you have this bond with
        intensity: string; // e.g. deep, complex, growing, lowkey, etc.
        nature: string; // e.g. affection, camaraderie, curiosity, etc.
    }[];

    // Experience
    // Track the experience points as a number.
    experience: number;

    // Story Points
    // Track the story points as a number.
    storyPoints: number;

    // Spark
    // Track the spark points as a number.
    sparkPoints: number;

    // TODO: Conditions & Notes
    // TODO: Vex
    // TODO:

    constructor(name: string) {
        this.id = uuid();
        this.name = name;
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
