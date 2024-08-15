import { DEFAULT_ICON_SIZE, IconItem } from "./PlaybookItems.js";

export const SPONSOR = {
    BLOOM_TECHNOLOGIES: './assets/sponsors/Bloom Technologies/Bloom Logo.png',
    GHOSTLINK_COLLECTIVE: './assets/sponsors/Ghostlink Collective/Ghostlink Logo.png',
    MORRGEN_UNITED: './assets/sponsors/Morrgen United/Morrgen Logo.png',
    MUU_ROBOTICS: './assets/sponsors/Muu Robotics/Muu Logo.png',
    PINNACLE_INTERNATIONAL: './assets/sponsors/Pinnacle International/Pinnacle Logo.png',
    RYKER_INDUSTRIES: './assets/sponsors/Ryker Industries/Ryker Logo.png',
    UMBRA_RECONNAISSANCE: './assets/sponsors/Umbra Reconnaissance/Umbra Logo.png',
    VECTOR_DYNAMICS: './assets/sponsors/Vector Dynamics/Vector Logo.png'
};

const centerX = (window.innerWidth / 2) - (DEFAULT_ICON_SIZE / 2);
const centerY = (window.innerHeight / 2) - (DEFAULT_ICON_SIZE / 2);

export class SponsorFactory {
    static makeSponsor(name, layerDraw) {
        switch (name) {
            case SPONSOR.BLOOM_TECHNOLOGIES:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.BLOOM_TECHNOLOGIES, layerDraw, '#0056b3');
            
            case SPONSOR.GHOSTLINK_COLLECTIVE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.GHOSTLINK_COLLECTIVE, layerDraw, '#0056b3');
                
            case SPONSOR.MORRGEN_UNITED:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.MORRGEN_UNITED, layerDraw, '#0056b3');
                
            case SPONSOR.MUU_ROBOTICS:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.MUU_ROBOTICS, layerDraw, '#0056b3');
                
            case SPONSOR.PINNACLE_INTERNATIONAL:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.PINNACLE_INTERNATIONAL, layerDraw, '#0056b3');
                
            case SPONSOR.RYKER_INDUSTRIES:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.RYKER_INDUSTRIES, layerDraw, '#0056b3');
                
            case SPONSOR.UMBRA_RECONNAISSANCE:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.UMBRA_RECONNAISSANCE, layerDraw, '#0056b3');
                
            case SPONSOR.VECTOR_DYNAMICS:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, SPONSOR.VECTOR_DYNAMICS, layerDraw, '#0056b3');
                
            default:
                console.error(`Tried to create an invalid sponsor: ${name}`);
                break;
        }
    }
}