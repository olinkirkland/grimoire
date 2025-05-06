import portraitData from '@/assets/data/portraits.json';

/**
 * Get the portrait data by its ID.
 * @param portraitId - The ID of the portrait.
 * @returns The portrait data or null if not found.
 */
export function getPortrait(
    portraitId: string
): { id: string; name: string; url: string } | null {
    const portrait = portraitData.find((p) => p.id === portraitId);
    return portrait || null;
}

/**
 * Get the URL of the portrait image by its ID.
 * If the portrait is not found, return the ID itself.
 * @param portraitId - The ID of the portrait.
 * @returns The URL of the portrait image or the ID if not found.
 */
export function getPortraitUrl(portraitId: string): string {
    const portrait = getPortrait(portraitId);
    return portrait ? portrait.url : portraitId;
}
