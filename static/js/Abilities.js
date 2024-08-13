export const ABILITY = {
    // Pinnacle International
    SPLINTER_GRENADE: './assets/sponsors/Pinnacle International/Splinter Grenade.png',
    ADRENALINK: './assets/sponsors/Pinnacle International/Adrena-Link.png',
    FLASH_GRENADE: './assets/sponsors/Pinnacle International/Flash Grenade.png',

    // Morrgen United
    HIDDEN_GRASP: './assets/sponsors/Morrgen United/Hidden Grasp.png',
    MELTDOWN: './assets/sponsors/Morrgen United/Meltdown.png',
    SMOKE_SHIFT: './assets/sponsors/Morrgen United/Smoke Shift.png',

    // Bloom Technologies
    HEX_BARRIER: './assets/sponsors/Bloom Technologies/Hex Barrier.png',
    SWARM_GRENADE: './assets/sponsors/Bloom Technologies/Swarm Grenade.png',
    TWIN_MEND: './assets/sponsors/Bloom Technologies/Twin Mend.png',

    // Ryker Industries
    ARC_SENTRY: './assets/sponsors/Ryker Industries/Arc Sentry.png',
    HULL_MINE: './assets/sponsors/Ryker Industries/Hull Mine.png',
    WAVE_SCAN: './assets/sponsors/Ryker Industries/Wave Scan.png',

    // Vector Dynamics
    DUAL_AMP: './assets/sponsors/Vector Dynamics/Dual Amp.png',
    NANO_SPHERE: './assets/sponsors/Vector Dynamics/Nano Sphere.png',
    VECTOR_WALL: './assets/sponsors/Vector Dynamics/Vector Wall.png',

    // Ghostlink Collective
    DEAD_ZONE: './assets/sponsors/Ghostlink Collective/Dead Zone.png',
    DUPE: './assets/sponsors/Ghostlink Collective/Dupe.png',
    PARTITION: './assets/sponsors/Ghostlink Collective/Partition.png',

    // Muu Robotics
    DAZZLER: './assets/sponsors/Muu Robotics/Dazzler.png',
    HYPER_DOME: './assets/sponsors/Muu Robotics/Hyper Dome.png',
    PATCHES: './assets/sponsors/Muu Robotics/Patches.png',

    // Umbra Reconnaissance
    GLARE_BURST: './assets/sponsors/Umbra Reconnaissance/Glare Burst.png',
    PULSEFINDER: './assets/sponsors/Umbra Reconnaissance/Pulsefinder.png',
    RECON_WING: './assets/sponsors/Umbra Reconnaissance/Recon Wing.png',
}

const PADDING = 8;
const DEFAULT_ICON_SIZE = 32;
const centerX = (window.innerWidth / 2) - (DEFAULT_ICON_SIZE / 2);
const centerY = (window.innerHeight / 2) - (DEFAULT_ICON_SIZE / 2);

// Maintain a list of abilities added to the screen
let abilitiesOnScreen = [];

function drawRoundedRect(context, x, y, width, height, radius, color) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
    context.lineTo(x + width, y + height - radius);
    context.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
    context.lineTo(x + radius, y + height);
    context.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    context.lineTo(x, y + radius);
    context.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
    context.closePath();

    // Fill or stroke the path
    context.fillStyle = color; // Change color as needed
    context.fill();
}

export class AbilityFactory {
    static makeAbility(name, layerDraw) {
        let drawX = centerX;
        let drawY = centerY;

        // Adjust position if there's already an ability at the center
        if (abilitiesOnScreen.length > 0) {
            const lastAbility = abilitiesOnScreen[abilitiesOnScreen.length - 1];
            drawX = lastAbility.x + DEFAULT_ICON_SIZE + PADDING;

            // If the new position would go beyond the screen width, reset to the center
            if (drawX + DEFAULT_ICON_SIZE > window.innerWidth) {
                drawX = centerX;
                drawY += DEFAULT_ICON_SIZE + PADDING; // Move to the next line
            }
        }

        const ability = new IconAbility(drawX, drawY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, name, layerDraw);
        abilitiesOnScreen.push(ability);
        return ability;
    }
}

export class IconAbility {
    constructor(x, y, width, height, imgSrc, layerDraw) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.layerDraw = layerDraw;

        this.image = new Image();
        this.image.src = imgSrc;
        this.image.onload = layerDraw;
    }

    moveTo(x, y) {
        console.log(x, y);
        this.x = x;
        this.y = y;
        this.layerDraw();
    }

    draw(ctx) {
        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, 'grey');

        const imgWidth = this.image.width;
        const imgHeight = this.image.height;
        const aspectRatio = imgWidth / imgHeight;
        let drawWidth = 0;
        let drawHeight = 0;
        if (imgWidth > imgHeight) {
            drawWidth = this.width - PADDING;
            drawHeight = drawWidth / aspectRatio;
        } else {
            drawHeight = this.height - PADDING;
            drawWidth = drawHeight * aspectRatio;
        }
        let x = this.x + (this.width - drawWidth) / 2;
        let y = this.y + (this.height - drawHeight) / 2;

        ctx.drawImage(this.image, x, y, drawWidth, drawHeight);
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        };
    }
}
