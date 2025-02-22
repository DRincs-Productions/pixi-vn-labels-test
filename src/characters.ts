import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const juliette = new CharacterBaseModel("___pixivn_juliette___", {
    name: "Juliette",
    age: 25,
    icon: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fcharacters%2Fjuliette-square.webp?alt=media",
    color: "#ac0086",
});

saveCharacter([juliette]);
