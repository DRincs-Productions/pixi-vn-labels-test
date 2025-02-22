import { CUSTOM_TICKER_CANVAS_ELEMENT_TEST_LABEL, eggHeadImage, eggHeadName } from "../constans";

/**
 * https://pixijs.com/examples/basic/tinting
 */
export const customTickerCanvasElementTestLabel = new Label(CUSTOM_TICKER_CANVAS_ELEMENT_TEST_LABEL, [
    async () => {
        const totalDudes = 100;

        for (let i = 0; i < totalDudes; i++) {
            // create a new Sprite that uses the image name that we just generated as its source
            const texture = await Assets.load(eggHeadImage);
            const dude = AlienTintingTest.from(texture);

            // set the anchor point so the texture is centered on the sprite
            dude.anchor.set(0.5);

            // set a random scale for the dude - no point them all being the same size!
            dude.scale.set(0.8 + Math.random() * 0.3);

            // finally lets set the dude to be at a random position..
            dude.x = Math.random() * canvas.screen.width;
            dude.y = Math.random() * canvas.screen.height;

            dude.tint = Math.random() * 0xffffff;

            // create some extra properties that will control movement :
            // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
            dude.direction = Math.random() * Math.PI * 2;

            // this number will be used to modify the direction of the dude over time
            dude.turningSpeed = Math.random() - 0.8;

            // create a random speed for the dude between 2 - 4
            dude.speed = 2 + Math.random() * 2;

            canvas.add("alien" + i, dude);
            let args: TintingTestTickerArgs = {};
            canvas.addTicker("alien" + i, new TintingTestTicker(args));
        }
        narration.dialogue = {
            character: juliette,
            text: `This is a test of custom ticker and canvas element. In this test, we have created ${totalDudes} ${eggHeadName} with random tint, scale, position, direction, turning speed, and speed. With the custom ticker, we are moving the custom canvas element in a random direction. (This example is from the official [PixiJS website](https://pixijs.com/8.x/examples/events/interactivity).)`,
        };
    },
]);
