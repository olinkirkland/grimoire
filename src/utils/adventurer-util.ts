import Adventurer from '@/adventurer';
import { Step } from '@/step';
import { capitalizeFirstLetter } from './naming-util';

/**
 * Import an adventurer from a URI.
 * @param uri - The URI to import.
 * @returns The imported adventurer or null if the import failed.
 */
export function importFromURI(uri: string): Adventurer | null {
    return null;
}

/**
 * Export an adventurer to a URI for sharing or saving.
 * @param adventurer - The adventurer to export.
 * @returns The URI string.
 */
export function exportURI(adventurer: Adventurer): string {
    return '';
}

/**
 * Use Markov chains to generate a random adventurer name.
 * @param names - An array of names to use as a base for the Markov chain.
 * @returns A random name generated using the Markov chain algorithm.
 */
export function generateMarkovName(names: string[], order: number): string | null {
    if (names.length === 0) return null;
    const model: Record<string, string[]> = {};

    const count = 10; // Number of unique names to generate

    // Build model
    for (const name of names) {
        const padded = '^'.repeat(order) + name.toLowerCase() + '$';
        for (let i = 0; i <= padded.length - order; i++) {
            const prefix = padded.slice(i, i + order);
            const nextChar = padded[i + order];
            if (!model[prefix]) model[prefix] = [];
            model[prefix].push(nextChar);
        }
    }

    const results = new Set<string>();

    while (results.size < count) {
        let prefix = '^'.repeat(order);
        let name = '';
        while (true) {
            const possible = model[prefix];
            if (!possible) break;
            const next = possible[Math.floor(Math.random() * possible.length)];
            if (next === '$') break;
            name += next;
            prefix = prefix.slice(1) + next;
        }

        const finalName = name.charAt(0).toUpperCase() + name.slice(1);
        if (!names.includes(finalName) && finalName.length >= 3) {
            results.add(finalName);
        }
    }

    const name = Array.from(results)[0];
    // Capitalize each word
    const words = name.split(' ');
    for (let i = 0; i < words.length; i++) words[i] = capitalizeFirstLetter(words[i]);
    return words.join(' ');
}

/**
 * Return a template for talent data, if it's available.
 * @param name - The talent key (e.g., bardsong, frenzy)
 * @returns The template string or null if not available.
 */
export function getTalentTemplate(key: string): any | null {
    switch (key) {
        case Step.BARDSONG:
            return { bardicInstrument: '' };
        case Step.FRENZY:
            return {
                frenzySources: [],
                notFrenzySources: [],
                scars: ['', '', '']
            };
        case Step.CHANNEL_DIVINITY:
            return {
                god: {
                    name: '',
                    epithet: ''
                },
                holySymbol: '',
                domains: [
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    },
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    },
                    {
                        name: '',
                        description: '',
                        tenets: '',
                        magic: ''
                    }
                ]
            };
        case Step.WILD_SHAPE:
            return {
                druidicTells: ''
            };
    }

    return null;
}
