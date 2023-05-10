import { easyItems } from "./Easy";
import { mediumItems } from "./Medium";
import { hardItems } from "./Hard";
import { extremeItems } from "./Extreme";
let len =
    easyItems.items.length +
    mediumItems.items.length +
    hardItems.items.length +
    extremeItems.items.length;

export const tc = {
    title: "TypeChallenge <br />" + `${len} / 147`,
    items: [easyItems, mediumItems, hardItems, extremeItems],
};
