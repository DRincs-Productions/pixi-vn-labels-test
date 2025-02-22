import { Assets, Texture } from "pixi.js";
import { CanvasEvent, Label, Sprite } from "../classes";
import { bunnyImage, bunnyName, CANVAS_EVENTS_TEST_LABEL, juliette } from "../constans";
import { eventDecorator } from "../decorators";
import { canvas, narration } from "../managers";
import { CanvasEventNamesType } from "../types";

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

export const canvasEventsTestLabel = new Label(
    CANVAS_EVENTS_TEST_LABEL,
    [
        () =>
            (narration.dialogue = {
                character: juliette,
                text: "This is the test of clickable elements in a canvas.",
            }),
        async () => {
            narration.dialogue = {
                character: juliette,
                text: `This is my friend, ${bunnyName}. It's small now, but if you try to click on it it will get bigger and bigger. (This example is from the official [PixiJS website](https://pixijs.com/8.x/examples/events/click).)`,
            };

            // Load the bunny texture
            const texture = await Assets.load(bunnyImage);

            // Create the bunny sprite
            const sprite = Sprite.from(texture);
            sprite.scale.set(3);

            // Set the initial position
            sprite.anchor.set(0.5);
            sprite.x = canvas.screen.width / 2;
            sprite.y = canvas.screen.height / 2;

            // Opt-in to interactivity
            sprite.eventMode = "static";

            // Shows hand cursor
            sprite.cursor = "pointer";

            // Pointers normalize touch and mouse (good for mobile and desktop)
            sprite.onEvent("pointerdown", EventTest1);

            // Alternatively, use the mouse & touch events:
            // sprite.on('click', onClick); // mouse-only
            // sprite.on('tap', onClick); // touch-only

            canvas.add("bunny", sprite);
        },
        async () => {
            canvas.clear();
            narration.dialogue = {
                character: juliette,
                text: `This is the test of buttons in a canvas. (This example is from the official [PixiJS website](https://pixijs.com/8.x/examples/events/interactivity).)`,
            };

            // Create a background...
            const backgroundT = await Assets.load("https://pixijs.com/assets/bg_button.jpg");
            const background = new Sprite(backgroundT);

            background.width = canvas.screen.width;
            background.height = canvas.screen.height;

            // Add background to stage...
            canvas.add("bg", background);

            // Create some textures from an image path
            const textureButton = await Assets.load("https://pixijs.com/assets/button.png");

            const buttons = [];

            const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

            for (let i = 0; i < 5; i++) {
                const button = new Sprite(textureButton);

                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];

                // Make the button interactive...
                button.eventMode = "static";
                button.cursor = "pointer";

                button
                    // Mouse & touch events are normalized into
                    // the pointer* events for handling different
                    // button events.
                    .onEvent("pointerdown", EventTest2)
                    .onEvent("pointerup", EventTest2)
                    .onEvent("pointerupoutside", EventTest2)
                    .onEvent("pointerover", EventTest2)
                    .onEvent("pointerout", EventTest2);

                // Add it to the stage
                canvas.add("button" + i, button);

                // Add button to array
                buttons.push(button);
            }

            // Set some silly values...
            buttons[0].scale.set(1.2);
            buttons[2].rotation = Math.PI / 10;
            buttons[3].scale.set(0.8);
            buttons[4].scale.set(0.8, 1.2);
            buttons[4].rotation = Math.PI;
        },
    ],
    {
        onLoadingLabel: async () => {
            await Assets.load([
                "https://pixijs.com/assets/bg_button.jpg",
                "https://pixijs.com/assets/button.png",
                "https://pixijs.com/assets/button_down.png",
                "https://pixijs.com/assets/button_over.png",
            ]);
        },
    }
);
