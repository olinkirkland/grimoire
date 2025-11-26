import sql from './db';

export async function createTable() {
    // Delete the table if it exists
    await sql`
        DROP TABLE IF EXISTS grimoire;
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS grimoire (
            id SERIAL PRIMARY KEY,
            semanticId TEXT UNIQUE,
            data TEXT NOT NULL
        );
    `;
}

export async function getDataBySemanticId(semanticId: string): Promise<string | null> {
    const result = await sql`
        SELECT data FROM grimoire WHERE semanticId = ${semanticId};
    `;

    return result[0]?.data || null;
}

export async function createDataEntry(data: string): Promise<number | null> {
    const result = await sql`
        INSERT INTO grimoire (data) VALUES (${data}) RETURNING semanticId;
    `;

    return result[0]?.id;
}
