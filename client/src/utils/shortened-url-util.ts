const api = 'grimoire-production-006b.up.railway.app';

export async function createEntry(body: string): Promise<string> {
    const response = await fetch(`https://${api}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body })
    });

    if (!response.ok) {
        throw new Error('Failed to create entry');
    }

    const data = await response.json();
    return data.semanticId;
}
