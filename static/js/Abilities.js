import { IconItem, DEFAULT_ICON_SIZE, RadiusItem, DirectionalItem } from "./PlaybookItems.js";

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

const centerX = (window.innerWidth / 2) - (DEFAULT_ICON_SIZE / 2);
const centerY = (window.innerHeight / 2) - (DEFAULT_ICON_SIZE / 2);

export class AbilityFactory {
    static makeAbility(name, layerDraw) {
        switch (name) {
            // Pinnacle International
            case ABILITY.SPLINTER_GRENADE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.SPLINTER_GRENADE, layerDraw, '#707070');
            case ABILITY.ADRENALINK:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.ADRENALINK, layerDraw, '#707070');
            case ABILITY.FLASH_GRENADE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.FLASH_GRENADE, layerDraw, '#707070');

            // Morrgen United
            case ABILITY.HIDDEN_GRASP:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.HIDDEN_GRASP, layerDraw, '#707070', 'lightblue');
            case ABILITY.MELTDOWN:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.MELTDOWN, layerDraw, '#707070', 'lightblue');
            case ABILITY.SMOKE_SHIFT:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.SMOKE_SHIFT, layerDraw, '#707070', 'lightblue');

            // Bloom Technologies
            case ABILITY.HEX_BARRIER:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.HEX_BARRIER, layerDraw, '#707070');
            case ABILITY.SWARM_GRENADE:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.SWARM_GRENADE, layerDraw, '#707070', 'lightblue');
            case ABILITY.TWIN_MEND:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.TWIN_MEND, layerDraw, '#707070');

            // Ryker Industries
            case ABILITY.ARC_SENTRY:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.ARC_SENTRY, layerDraw, '#707070');
            case ABILITY.HULL_MINE:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.HULL_MINE, layerDraw, '#707070', 'lightblue');
            case ABILITY.WAVE_SCAN:
                return new DirectionalItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 20, 256, ABILITY.WAVE_SCAN, layerDraw, '#707070', 'rgba(173, 216, 230, 0.5)');

            // Vector Dynamics
            case ABILITY.DUAL_AMP:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DUAL_AMP, layerDraw, '#707070');
            case ABILITY.NANO_SPHERE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.NANO_SPHERE, layerDraw, '#707070');
            case ABILITY.VECTOR_WALL:
                return new DirectionalItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 48, 64, ABILITY.VECTOR_WALL, layerDraw, '#707070', 'rgba(173, 216, 230, 0.5)');

            // Ghostlink Collective
            case ABILITY.DEAD_ZONE:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.DEAD_ZONE, layerDraw, '#707070', 'lightblue');
            case ABILITY.DUPE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DUPE, layerDraw, '#707070');
            case ABILITY.PARTITION:
                return new DirectionalItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 8, 128, ABILITY.PARTITION, layerDraw, '#707070', 'rgba(173, 216, 230, 0.5)');

            // Muu Robotics
            case ABILITY.DAZZLER:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.DAZZLER, layerDraw, '#707070');
            case ABILITY.HYPER_DOME:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.HYPER_DOME, layerDraw, '#707070', 'lightblue');
            case ABILITY.PATCHES:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.PATCHES, layerDraw, '#707070');

            // Umbra Reconnaissance
            case ABILITY.GLARE_BURST:
                return new DirectionalItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 20, 64, ABILITY.GLARE_BURST, layerDraw, '#707070', 'rgba(173, 216, 230, 0.5)');
            case ABILITY.PULSEFINDER:
                return new DirectionalItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 48, 64, ABILITY.PULSEFINDER, layerDraw, '#707070', 'rgba(173, 216, 230, 0.5)');
            case ABILITY.RECON_WING:
                return new RadiusItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, 46, ABILITY.RECON_WING, layerDraw, '#707070', 'lightblue');

            default:
                console.error(`Tried to create an invalid ability: ${name}`);
                break;
        }
    }
}


