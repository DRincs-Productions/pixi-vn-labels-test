import { canvasComponentDecorator, Sprite, SpriteBaseMemory, SpriteMemory, Texture, TextureSourceLike } from "@drincs/pixi-vn";

interface IAlienTintingMemory extends SpriteBaseMemory {
    direction: number;
    turningSpeed: number;
    speed: number;
}

@canvasComponentDecorator("___pixi_vn_custom_canvas_element___")
export class AlienTintingTest extends Sprite<IAlienTintingMemory> {
    override get memory() {
        return {
            ...super.memory,
            direction: this.direction,
            turningSpeed: this.turningSpeed,
            speed: this.speed,
        };
    }
    override set memory(memory: IAlienTintingMemory) {
        super.memory = memory as SpriteMemory;
        this.direction = memory.direction;
        this.turningSpeed = memory.turningSpeed;
        this.speed = memory.speed;
    }
    direction: number = 0;
    turningSpeed: number = 0;
    speed: number = 0;
    static override from(source: Texture | TextureSourceLike, skipCache?: boolean) {
        let sprite = Sprite.from(source, skipCache);
        let mySprite = new AlienTintingTest();
        mySprite.texture = sprite.texture;
        return mySprite;
    }
}
