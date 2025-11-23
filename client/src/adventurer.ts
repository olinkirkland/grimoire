import { v4 as uuid } from 'uuid';

export type Background = {
    name: string;
    wises: string[]; // Array of strings representing the three wises of the background
};

export default class Adventurer {
    id: string;
    createdAt: number;
    updatedAt: number;

    // Options
    options: {
        useHeritage: boolean; // Whether to use heritage or a second background
        color: string; // Color on the sheet
        font: string; // Font on the sheet
    };

    // Name
    name: string;
    playerName: string;

    // Backgrounds
    // Choose two backgrounds, each with three wises, that detail your heritage or profession.
    heritage: Background;
    background: Background;

    // Heritage Crucibles
    heritageCrucibles: {
        folk: string;
        mood: string;
        land: string;
        wises: string;
    };

    // Traits
    // Choose 2 you very much are and 1 you definitely aren't: brave, caring, confident, curious, gentle, honest, honorable, persistent, protective, quiet, rash, stubborn.
    traits: string[];
    notTraits: string[];

    // Desires
    // Choose 2 you truly desire and 1 you definitely don't: belonging, glory, harmony, honor, justice, knowledge, love, power, renown, thrills, wealth, wisdom.
    desires: string[];
    notDesires: string[];

    // Features
    // Write down three distinctive features, words or short phrases that others soon notice about you, like strong hands, kind eyes, or a gravelly voice.
    features: string[];

    // Features Crucibles
    featuresCrucibles: {
        age: string;
        clothing: string;
        voice: string;
        body: string;
        eyes: string;
        hair: string;
    };

    // Path
    // Choose a path, gain its core talent, and pick either another talent from your path's list or a non-core talent from another path.
    path: string | null;

    // Talents
    // Talents are tracked in an array of strings. The character sheet gets bubbled in based on this.
    talents: string[];

    // Talent data is an object that contains customized information for each chosen talent.
    // It's stored in a key/value format, where the key is the talent name and the value is an object with varying properties.
    talentsData: {
        [key: string]: any;
    };

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
    arcs: { description: string }[];

    // Bonds
    // Describe your characters in detail. As you listen, choose one bond you have towards each PC, matching together an intensity and a nature of the bond.
    bonds: {
        name: string; // Name of the character you have this bond with
        intensity: string; // e.g. deep, complex, growing, lowkey, etc.
        nature: string; // e.g. affection, camaraderie, curiosity, etc.
        description: string; // Description of the bond
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

    constructor(name: string) {
        this.id = uuid();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();

        this.options = {
            useHeritage: true, // Default to true
            color: '#717854', // Default color
            font: 'Open Sans' // Default font
        };

        this.name = name;
        this.playerName = '';

        this.heritageCrucibles = {
            folk: '',
            mood: '',
            land: '',
            wises: ''
        };

        this.heritage = {
            name: '',
            wises: ['', '', '']
        };
        this.background = {
            name: '',
            wises: ['', '', '']
        };
        this.traits = [];
        this.notTraits = [];
        this.desires = [];
        this.notDesires = [];
        this.features = ['', '', ''];
        this.featuresCrucibles = {
            age: '',
            clothing: '',
            voice: '',
            body: '',
            eyes: '',
            hair: ''
        };
        this.path = null;
        this.talents = [];
        this.talentsData = {};
        this.stats = {
            brawn: 1,
            agility: 1,
            wits: 1,
            presence: 1
        };
        this.arcs = [];
        this.bonds = [];
        this.experience = 0;
        this.storyPoints = 0;
        this.sparkPoints = 0;
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
