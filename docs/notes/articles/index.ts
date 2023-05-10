import { readDirectory } from "../../utils";
// console.log(readDirectory(__dirname));

export const articlesItems = readDirectory(__dirname, false, "notes");
