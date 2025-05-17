import sheetData from '@/assets/data/sheet-data.json';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import Adventurer from './adventurer';
import { BASE_URL } from './router';

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

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.font = `32px ${font}`;
            ctx.fillStyle = color;

            // Draw a guide grid every 100 pixels
            // drawGrid(ctx, canvas);

            // Names
            ctx.fillText(adventurer.name, sheetData.name.x, sheetData.name.y);
            ctx.fillText(adventurer.playerName, sheetData.playerName.x, sheetData.playerName.y);

            // Distinctive Features
            ctx.font = `24px ${font}`;
            ctx.fillText(adventurer.features[0], sheetData.features[0].x, sheetData.features[0].y);
            ctx.fillText(adventurer.features[1], sheetData.features[1].x, sheetData.features[1].y);
            ctx.fillText(adventurer.features[2], sheetData.features[2].x, sheetData.features[2].y);
            ctx.font = `32px ${font}`;

            // Stats
            ctx.font = `48px ${font}`;
            ctx.fillText(adventurer.stats.brawn.toString(), sheetData.stats.brawn.x, sheetData.stats.brawn.y);
            ctx.fillText(adventurer.stats.agility.toString(), sheetData.stats.agility.x, sheetData.stats.agility.y);
            ctx.fillText(adventurer.stats.wits.toString(), sheetData.stats.wits.x, sheetData.stats.wits.y);
            ctx.fillText(adventurer.stats.presence.toString(), sheetData.stats.presence.x, sheetData.stats.presence.y);
            ctx.font = `32px ${font}`;

            // Backgrounds
            ctx.fillText(adventurer.background.name, sheetData.background1.x, sheetData.background1.y);
            ctx.fillText(adventurer.heritage.name, sheetData.background2.x, sheetData.background2.y);

            // Wises 1
            ctx.font = `24px ${font}`;
            const wisesCombined1 = adventurer.background.wises.join(', ');
            ctx.fillText(wisesCombined1, sheetData.wises1.x, sheetData.wises1.y);
            ctx.font = `32px ${font}`;

            // Wises 2
            ctx.font = `24px ${font}`;
            const wisesCombined2 = adventurer.heritage.wises.join(', ');
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
