import { Label, VideoSprite } from "../../../pixi-vn/src/classes";
import { showWithDissolve } from "../../../pixi-vn/src/functions";
import { canvas, narration } from "../../../pixi-vn/src/managers";
import { juliette, VIDEO_TEST_LABEL, videoLink } from "../constans";

export const videoTest = new Label(VIDEO_TEST_LABEL, [
    async () => {
        narration.dialogue = {
            character: juliette,
            text: `This is the test of video elements in a canvas. I have added a video element to the canvas with dissolve transition.`,
        };
        showWithDissolve("video", videoLink, { duration: 1 });
    },
    async () => {
        narration.dialogue = {
            character: juliette,
            text: `The video is now paused.`,
        };
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.pause();
        }
    },
    async () => {
        narration.dialogue = {
            character: juliette,
            text: `The video is now playing.`,
        };
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.play();
            video.loop = true;
        }
    },
    async () => {
        narration.dialogue = {
            character: juliette,
            text: `The video is now restarted.`,
        };
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.restart();
        }
    },
]);
