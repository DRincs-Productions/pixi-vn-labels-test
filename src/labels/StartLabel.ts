import { ChoiceMenuOption, Label } from "../../../pixi-vn/src/classes";
import { PIXIVN_VERSION } from "../../../pixi-vn/src/constants";
import { getCharacterById } from "../../../pixi-vn/src/decorators";
import { canvas, narration } from "../../../pixi-vn/src/managers";
import {
    BASE_CANVAS_ELEMENT_LABEL,
    CUSTOM_TICKER_CANVAS_ELEMENT_TEST_LABEL,
    IMAGE_ANIMAIONS_TEST_LABEL,
    INPUT_TEST_LABEL,
    juliette,
    MARKDOWN_TEST_LABEL,
    OPEN_LINK_LABEL,
    RESTART_TEST_LABEL,
    SOUND_TEST_LABEL,
    STEP_LABEL_TEST_LABEL,
    TEST_LABEL,
    VIDEO_TEST_LABEL,
} from "../constans";

export const pixivnTestStartLabel = new Label(TEST_LABEL, [
    () => {
        let currentTimeName = "";
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            currentTimeName = "morning🔅";
        } else if (hour >= 12 && hour < 18) {
            currentTimeName = "afternoon🔆";
        } else if (hour >= 18 && hour < 22) {
            currentTimeName = "evening⛅";
        } else {
            currentTimeName = "night🌙";
        }
        let julietteObj = getCharacterById(juliette)!;
        narration.dialogue = {
            character: juliette,
            text: `Good ${currentTimeName}! I'm ${julietteObj.name}, your virtual assistant. I'm here to help you with your tests.`,
        };
    },
    () =>
        (narration.dialogue = {
            character: juliette,
            text: `You are running the Pixi’VN v${PIXIVN_VERSION} test. This test will guide you through the different features of the library.`,
        }),
    (props) => narration.jumpLabel(pixivnTestStartLabel2, props),
]);

export const openLink = new Label<{ link: string }>(OPEN_LINK_LABEL, [
    async (props) => {
        window.open(props.link);
        await narration.goNext(props);
    },
]);

export const pixivnTestStartLabel2 = new Label(RESTART_TEST_LABEL, [
    () => {
        canvas.clear();
        narration.dialogue = { character: juliette, text: "Which test would you like to start with?" };
        narration.choiceMenuOptions = [
            new ChoiceMenuOption("Open Pixi’VN Wiki", openLink, { link: "https://pixi-vn.web.app/" }),
            new ChoiceMenuOption("Open Pixi’VN Discord", openLink, { link: "https://discord.gg/E95FZWakzp" }),
            new ChoiceMenuOption("Open Pixi’VN Github Issues", openLink, {
                link: "https://github.com/DRincs-Productions/pixi-vn/issues",
            }),
            new ChoiceMenuOption("Images, Transitions and Animations Test", IMAGE_ANIMAIONS_TEST_LABEL, {}),
            new ChoiceMenuOption("Video Test", VIDEO_TEST_LABEL, {}),
            // new ChoiceMenuOption("Canvas Events Test", CANVAS_EVENTS_TEST_LABEL, {}),
            new ChoiceMenuOption("Sound Test", SOUND_TEST_LABEL, {}),
            new ChoiceMenuOption("Base Canvas Element Test", BASE_CANVAS_ELEMENT_LABEL, {}),
            new ChoiceMenuOption("Custom Ticker Canvas Element Test", CUSTOM_TICKER_CANVAS_ELEMENT_TEST_LABEL, {}),
            new ChoiceMenuOption("Steps and Labels Test", STEP_LABEL_TEST_LABEL, {}),
            new ChoiceMenuOption("Markdown Test", MARKDOWN_TEST_LABEL, {}),
            new ChoiceMenuOption("Input Test", INPUT_TEST_LABEL, {}),
        ];
    },
    (props) => narration.jumpLabel(RESTART_TEST_LABEL, props),
]);
