import { DEFAULT_ICON_SIZE, IconItem } from "./PlaybookItems.js";

export const MISC = {
    ZEUS: './assets/miscellaneous/ZEUS Icon.png',
}

const centerX = (window.innerWidth / 2) - (DEFAULT_ICON_SIZE / 2);
const centerY = (window.innerHeight / 2) - (DEFAULT_ICON_SIZE / 2);

export class MiscFactory {
    static makeMisc(name, layerDraw) {
        console.log('Making a misc item')
        switch (name) {
            case MISC.ZEUS:
                return new IconItem(centerX, centerY, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, MISC.ZEUS, layerDraw, '#707070');
        
            default:
                console.error(`Tried to create an invalid miscellaneous item: ${name}`);
                break;
        }
    }
}