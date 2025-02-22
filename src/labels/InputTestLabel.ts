import { Label } from "../../../pixi-vn/src/classes";
import { narration } from "../../../pixi-vn/src/managers";
import { INPUT_TEST_LABEL, juliette } from "../constans";

export const inputTestLabel = new Label(INPUT_TEST_LABEL, [
    () => {
        narration.dialogue = {
            character: juliette,
            text: "What is your name?",
        };
        narration.requestInput({ type: "string" }, "default value");
    },
    () => {
        narration.dialogue = {
            character: juliette,
            text: `Nice to meet you, ${narration.inputValue}!`,
        };
    },
]);
