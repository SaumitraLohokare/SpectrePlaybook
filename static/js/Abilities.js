export const ABILITY = {
    // Pinnacle International
    SPLINTER_GRENADE: './assets/sponsors/Pinnacle International/Splinter Grenade.png',
    ADRENALINK: './assets/sponsors/Pinnacle International/Adrena-link.png',
    FLASH_GRENADE: './assets/sponsors/Pinnacle International/Flash Grenade.png',
}

const PADDING = 8;
const DEFAULT_ICON_SIZE = 32;

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
            case ABILITY.SPLINTER_GRENADE:
                return new IconAbility(400, 400, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.SPLINTER_GRENADE, layerDraw)
            case ABILITY.ADRENALINK:
                return new IconAbility(450, 400, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.ADRENALINK, layerDraw)
            case ABILITY.FLASH_GRENADE:
                return new IconAbility(350, 400, DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE, ABILITY.FLASH_GRENADE, layerDraw)
            default:
                console.error(`Tried to create an invalid ability: ${name}`)
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

        this.image = new Image()
        this.image.src = imgSrc
        this.image.onload = layerDraw
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
}