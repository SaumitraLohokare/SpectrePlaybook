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
        switch (name) {
            // Pinnacle International
            case ABILITY.SPLINTER_GRENADE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.SPLINTER_GRENADE, layerDraw);
            case ABILITY.ADRENALINK:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.ADRENALINK, layerDraw);
            case ABILITY.FLASH_GRENADE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.FLASH_GRENADE, layerDraw);

            // Morrgen United
            case ABILITY.HIDDEN_GRASP:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.HIDDEN_GRASP, layerDraw);
            case ABILITY.MELTDOWN:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.MELTDOWN, layerDraw);
            case ABILITY.SMOKE_SHIFT:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.SMOKE_SHIFT, layerDraw);

            // Bloom Technologies
            case ABILITY.HEX_BARRIER:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.HEX_BARRIER, layerDraw);
            case ABILITY.SWARM_GRENADE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.SWARM_GRENADE, layerDraw);
            case ABILITY.TWIN_MEND:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.TWIN_MEND, layerDraw);

            // Ryker Industries
            case ABILITY.ARC_SENTRY:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.ARC_SENTRY, layerDraw);
            case ABILITY.HULL_MINE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.HULL_MINE, layerDraw);
            case ABILITY.WAVE_SCAN:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.WAVE_SCAN, layerDraw);

            // Vector Dynamics
            case ABILITY.DUAL_AMP:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DUAL_AMP, layerDraw);
            case ABILITY.NANO_SPHERE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.NANO_SPHERE, layerDraw);
            case ABILITY.VECTOR_WALL:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.VECTOR_WALL, layerDraw);

            // Ghostlink Collective
            case ABILITY.DEAD_ZONE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DEAD_ZONE, layerDraw);
            case ABILITY.DUPE:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DUPE, layerDraw);
            case ABILITY.PARTITION:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.PARTITION, layerDraw);

            // Muu Robotics
            case ABILITY.DAZZLER:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DAZZLER, layerDraw);
            case ABILITY.HYPER_DOME:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.HYPER_DOME, layerDraw);
            case ABILITY.PATCHES:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.PATCHES, layerDraw);

            // Umbra Reconnaissance
            case ABILITY.GLARE_BURST:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.GLARE_BURST, layerDraw);
            case ABILITY.PULSEFINDER:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.PULSEFINDER, layerDraw);
            case ABILITY.RECON_WING:
                return new IconAbility(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.RECON_WING, layerDraw);

            default:
                console.error(`Tried to create an invalid ability: ${name}`);
                break;
        }
    }
}


export class IconAbility {
    constructor(x, y, width, height, imgSrc, layerDraw) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.layerDraw = layerDraw

        this.image = new Image()
        this.image.src = imgSrc
        this.image.onload = layerDraw
    }

    moveTo(x, y) {
        console.log(x, y)
        this.x = x
        this.y = y
        this.layerDraw()
    }

    draw(ctx) {
        drawRoundedRect(ctx, this.x, this.y, this.width, this.height, 4, 'grey')

        const imgWidth = this.image.width
        const imgHeight = this.image.height
        const aspectRatio = imgWidth / imgHeight
        let drawWidth = 0
        let drawHeight = 0
        if (imgWidth > imgHeight) {
            drawWidth = this.width - PADDING
            drawHeight = drawWidth / aspectRatio
        } else {
            drawHeight = this.height - PADDING
            drawWidth = drawHeight * aspectRatio
        }        
        let x = this.x + (this.width - drawWidth) / 2
        let y = this.y + (this.height - drawHeight) / 2
        
        ctx.drawImage(this.image, x, y, drawWidth , drawHeight)
    }

    checkPointCollision(x, y) {
        return {
            isColliding: x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height,
            offsetX: x - this.x,
            offsetY: y - this.y,
        }
    }
}

// TODO: Add RadiusAbility
// TODO: Add DirectionalAbility
// TODO: Add LineAbility