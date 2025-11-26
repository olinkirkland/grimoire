import sql from './db';

export async function createTable() {
    // Delete the table if it exists
    await sql`
        DROP TABLE IF EXISTS grimoire;
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS grimoire (
            id SERIAL PRIMARY KEY,
            semantic_id TEXT UNIQUE,
            data TEXT NOT NULL
        );
    `;
}

export async function getDataBySemanticId(semanticId: string): Promise<string | null> {
    const result = await sql`
        SELECT data FROM grimoire WHERE semantic_id = ${semanticId};
    `;

    return result[0]?.data || null;
}

export async function createDataEntry(data: string): Promise<string | null> {
    const result = await sql`
        INSERT INTO grimoire (data) VALUES (${data}) RETURNING semantic_id;
    `;

    return result[0]?.semanticId;
}
