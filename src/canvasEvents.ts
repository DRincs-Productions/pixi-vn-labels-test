import { CanvasEvent, CanvasEventNamesType, eventDecorator, Sprite, Texture } from "@drincs/pixi-vn";

@eventDecorator("___pixi_vn_canvas_events_test_event1___")
export class EventTest1 extends CanvasEvent<Sprite> {
    override fn(event: CanvasEventNamesType, sprite: Sprite): void {
        if (event === "pointerdown") {
            sprite.scale.x *= 1.25;
            sprite.scale.y *= 1.25;
        }
    }
}
@eventDecorator("___pixi_vn_canvas_events_test_event2___")
export class EventTest2 extends CanvasEvent<Sprite> {
    override fn(event: CanvasEventNamesType, sprite: Sprite): void {
        if (event === "pointerdown") {
            (sprite as any).isdown = true;
            sprite.texture = Texture.from("https://pixijs.com/assets/button_down.png");
            sprite.alpha = 1;
        } else if (event === "pointerup" || event === "pointerupoutside") {
            (sprite as any).isdown = false;
            if ((sprite as any).isOver) {
                sprite.texture = Texture.from("https://pixijs.com/assets/button_over.png");
            } else {
                sprite.texture = Texture.from("https://pixijs.com/assets/button.png");
            }
        } else if (event === "pointerover") {
            (sprite as any).isOver = true;
            if ((sprite as any).isdown) {
                return;
            }
            sprite.texture = Texture.from("https://pixijs.com/assets/button_over.png");
        } else if (event === "pointerout") {
            (sprite as any).isOver = false;
            if ((sprite as any).isdown) {
                return;
            }
            sprite.texture = Texture.from("https://pixijs.com/assets/button.png");
        }
    }
}
