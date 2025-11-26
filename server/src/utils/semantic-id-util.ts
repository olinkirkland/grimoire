import WORDS from '../data/words-list.json';
import sql from '../database/db';
const flatWordsList: string[] = Object.values(WORDS).flat();

// Select partsCount random words from the flatWordsList and join them with hyphens
export function generateSemanticId(partsCount: number = 4): string {
    const selectedWords: string[] = [];
    const wordsListLength = flatWordsList.length;

    while (selectedWords.length < partsCount) {
        const randomIndex = Math.floor(Math.random() * wordsListLength);
        const word = flatWordsList[randomIndex];
        if (!selectedWords.includes(word)) selectedWords.push(word);
    }

    const semanticId = selectedWords.join('-');

    // Ensure the generated semanticId is unique in the database
    if (!isSemanticIdUnique(semanticId)) return generateSemanticId(partsCount);
}

function isSemanticIdUnique(semanticId: string): boolean {
    const result = sql`SELECT COUNT(*) as count FROM data_entries WHERE semantic_id = ${semanticId}`;
    return result[0].count === 0;
}
