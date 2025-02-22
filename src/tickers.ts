import { canvas, Rectangle, TickerBase, tickerDecorator, TickerValue } from "@drincs/pixi-vn";
import { AlienTintingTest } from "./canvasComponents";

interface TintingTestTickerArgs {
    test?: string;
}

@tickerDecorator("___pixi_vn_custom_ticker___")
export class TintingTestTicker extends TickerBase<TintingTestTickerArgs> {
    override fn(_t: TickerValue, _args: {}, aliases: string[]): void {
        aliases.forEach((alias) => {
            // create a bounding box for the little dudes
            const dudeBoundsPadding = 100;
            const dudeBounds = new Rectangle(
                -dudeBoundsPadding,
                -dudeBoundsPadding,
                canvas.screen.width + dudeBoundsPadding * 2,
                canvas.screen.height + dudeBoundsPadding * 2
            );
            let dude = canvas.find(alias);
            if (dude && dude instanceof AlienTintingTest) {
                dude.direction += dude.turningSpeed * 0.01;
                dude.x += Math.sin(dude.direction) * dude.speed;
                dude.y += Math.cos(dude.direction) * dude.speed;
                dude.rotation = -dude.direction - Math.PI / 2;

                // wrap the dudes by testing their bounds...
                if (dude.x < dudeBounds.x) {
                    dude.x += dudeBounds.width;
                } else if (dude.x > dudeBounds.x + dudeBounds.width) {
                    dude.x -= dudeBounds.width;
                }

                if (dude.y < dudeBounds.y) {
                    dude.y += dudeBounds.height;
                } else if (dude.y > dudeBounds.y + dudeBounds.height) {
                    dude.y -= dudeBounds.height;
                }
            }
        });
    }
}