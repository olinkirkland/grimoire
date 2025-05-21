import sheetData from '@/assets/data/sheet-data.json';
import talentsData from '@/assets/data/talents.json';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import Adventurer from './adventurer';
import { BASE_URL } from './router';

const DEBUG_MODE = false;

export async function paintSheet(adventurer: Adventurer): Promise<HTMLCanvasElement> {
    const color = adventurer.options.color;
    const font = adventurer.options.font;

    return new Promise((resolve, reject) => {
        const template = new Image();
        template.src = `${BASE_URL}assets/sheets/${adventurer.path}.png`;

        template.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = template.width;
            canvas.height = template.height;

            const roughCanvas = rough.canvas(canvas);
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(template, 0, 0);

            // Defaults
            ctx.lineWidth = 2;
            ctx.font = `32px ${font}`;
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            const normalFont = {
                font: `32px ${font}`,
                color: ctx.fillStyle
            };

            const bigFont = {
                font: `bold 48px ${font}`,
                color: ctx.fillStyle
            };

            const smallFont = {
                font: `20px ${font}`,
                color: ctx.fillStyle
            };

            // Draw a guide grid every 100 pixels
            if (DEBUG_MODE) drawGrid(ctx, canvas);

            // Names
            const { name, playerName } = sheetData;
            writeText(ctx, adventurer.name, name.x, name.y, name.width, normalFont);
            writeText(ctx, adventurer.playerName, playerName.x, playerName.y, playerName.width, normalFont);

            // Distinctive Features
            const { features } = sheetData;
            writeText(ctx, adventurer.features[0], features[0].x, features[0].y, features[0].width, smallFont);
            writeText(ctx, adventurer.features[1], features[1].x, features[1].y, features[1].width, smallFont);
            writeText(ctx, adventurer.features[2], features[2].x, features[2].y, features[2].width, smallFont);

            // Stats
            const { brawn, agility, wits, presence } = sheetData.stats;
            writeText(ctx, adventurer.stats.brawn.toString(), brawn.x, brawn.y, brawn.width, bigFont);
            writeText(ctx, adventurer.stats.agility.toString(), agility.x, agility.y, agility.width, bigFont);
            writeText(ctx, adventurer.stats.wits.toString(), wits.x, wits.y, wits.width, bigFont);
            writeText(ctx, adventurer.stats.presence.toString(), presence.x, presence.y, presence.width, bigFont);

            // Backgrounds
            const { background1, background2 } = sheetData;
            writeText(ctx, adventurer.background.name, background1.x, background1.y, background1.width, normalFont);
            writeText(ctx, adventurer.heritage.name, background2.x, background2.y, background2.width, normalFont);

            // Wises 1
            ctx.font = `24px ${font}`;
            const wisesCombined1 = adventurer.background.wises.filter((w) => w.length > 0).join(', ');
            ctx.fillText(wisesCombined1, sheetData.wises1.x, sheetData.wises1.y);
            ctx.font = `32px ${font}`;

            // Wises 2
            ctx.font = `24px ${font}`;
            const wisesCombined2 = adventurer.heritage.wises.filter((w) => w.length > 0).join(', ');
            ctx.fillText(wisesCombined2, sheetData.wises2.x, sheetData.wises2.y);
            ctx.font = `32px ${font}`;

            // Traits bubbles (filled)
            adventurer.traits.forEach((trait) => {
                const point = sheetData.traits[trait as keyof typeof sheetData.traits];
                if (point) drawRoughDot(roughCanvas, point, color);
            });

            // Not traits bubbles (slashed)
            adventurer.notTraits.forEach((trait) => {
                const point = sheetData.traits[trait as keyof typeof sheetData.traits];
                if (point) drawRoughSlash(roughCanvas, point, color);
            });

            // Desires bubbles (filled)
            adventurer.desires.forEach((desire) => {
                const point = sheetData.desires[desire as keyof typeof sheetData.desires];
                if (point) drawRoughDot(roughCanvas, point, color);
            });

            // Not desires bubbles (slashed)
            adventurer.notDesires.forEach((desire) => {
                const point = sheetData.desires[desire as keyof typeof sheetData.desires];
                if (point) drawRoughSlash(roughCanvas, point, color);
            });

            // Fill out talent bubbles
            console.log('Fill in talent bubbles');
            for (const talent of adventurer.talents) {
                // If it's not a talent from the adventurer's path, bubble it in
                const talentPath = talentsData.find((t) => t.id === talent)?.source;
                if (talentPath !== adventurer.path) continue;

                // Bubble in the talent
                const point = sheetData.talents[talent as keyof typeof sheetData.talents];
                if (point) drawRoughDot(roughCanvas, point, color);

                const takenAgain = adventurer.talentsData[talent]?.takenAgain;
                if (takenAgain) {
                    const secondTalentName = talent + '-2';
                    const point2 = sheetData.talents[secondTalentName as keyof typeof sheetData.talents];
                    if (point2) drawRoughDot(roughCanvas, point2, color);
                }
            }

            resolve(canvas);
        };

        template.onerror = (error) => {
            reject(new Error(`Failed to load image: ${template.src}`));
        };
    });
}

function drawGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.5;

    for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    ctx.restore();
}

function drawRoughDot(roughCanvas: RoughCanvas, point: { x: number; y: number }, color: string, size: number = 16) {
    roughCanvas.ellipse(point.x, point.y, size, size, {
        fill: color,
        fillStyle: 'solid',
        stroke: color,
        strokeWidth: 2,
        roughness: 1,
        bowing: 0
    });
}

function drawRoughSlash(roughCanvas: RoughCanvas, point: { x: number; y: number }, color: string, size: number = 16) {
    // Diagonal slash going from bottom left to top right
    roughCanvas.linearPath(
        [
            [point.x - size / 2, point.y + size / 2],
            [point.x + size / 2, point.y - size / 2]
        ],
        {
            stroke: color,
            strokeWidth: 2,
            roughness: 1,
            bowing: 0
        }
    );
}

function writeText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    width: number,
    options: { font: string; color: string },
    maxLines: number = 1
) {
    // Get the current font, size, and color to restore later
    const originalFont = ctx.font;
    const originalColor = ctx.fillStyle;
    const originalLineWidth = ctx.lineWidth;
    const originalStrokeStyle = ctx.strokeStyle;
    const originalFillStyle = ctx.fillStyle;

    ctx.font = options.font;
    ctx.fillStyle = options.color;

    // Break text into lines if necessary
    const lines = breakIntoLines(ctx, text, width, maxLines);
    console.log(lines);
    // Get the font size (number) from the font string
    const fontSize = parseInt(ctx.font.match(/(\d+)/)?.[0] || '32');
    const lineHeight = fontSize * 1.2;

    lines.forEach((line, i) => {
        ctx.fillText(line, x, y + i * lineHeight);
    });

    if (DEBUG_MODE) {
        // Draw a rectangle around the text (use width and total height)
        ctx.strokeStyle = options.color;
        ctx.fillStyle = 'transparent';
        ctx.lineWidth = 1;
        const totalHeight = lineHeight * lines.length;
        ctx.strokeRect(x, y - fontSize, width, totalHeight);
        // Draw a red rectangle around each text line
        ctx.strokeStyle = 'red';
        lines.forEach((line, i) => {
            const textWidth = ctx.measureText(line).width;
            ctx.strokeRect(x, y - fontSize + i * lineHeight, textWidth, fontSize);
        });
    }

    // Restore the original font, size, and color
    ctx.font = originalFont;
    ctx.fillStyle = originalColor;
    ctx.lineWidth = originalLineWidth;
    ctx.strokeStyle = originalStrokeStyle;
    ctx.fillStyle = originalFillStyle;
}

// Function to fit text within a specified width
// and break it into multiple lines if necessary
function breakIntoLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number = -1
): string[] {
    // If maxLines is < 0, we don't limit the number of lines
    // If the lines are limited, use fitText to fit the text for the last line
    const lines: string[] = [];
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine.trim());
    }
    // If maxLines is set, we need to fit the last line
    if (maxLines > 0 && lines.length > maxLines) {
        const lastLine = lines.pop()!;
        const fittedText = fitText(ctx, lastLine, maxWidth);
        lines.push(fittedText);
    }
    return lines;
}

// Adapted from https://stackoverflow.com/a/10511598/1546303
// Ensures that the text fits within the specified width, adding ellipsis if necessary
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    var width = ctx.measureText(text).width;
    var ellipsis = '...';
    var ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width <= maxWidth || width <= ellipsisWidth) {
        return text;
    } else {
        var len = text.length;
        while (width >= maxWidth - ellipsisWidth && len-- > 0) {
            text = text.substring(0, len);
            width = ctx.measureText(text).width;
        }
        return text + ellipsis;
    }
}
