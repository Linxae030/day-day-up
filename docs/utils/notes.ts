import * as fs from "fs";
import { NavBarItem, LinkItem } from "./types";
import { getBaseName, getDirName } from "./path";

const tcDifficulties = {
    Easy: 13,
    Medium: 74,
    Hard: 44,
    Extreme: 14,
};
export interface File {
    name: string;
    path: string;
    isDirectory: boolean;
    children: File[];
}
function readDirectory(directoryPath: string, isNested: true, prefix: string): NavBarItem;
function readDirectory(directoryPath: string, isNested: false, prefix: string): LinkItem[];
function readDirectory(
    directoryPath: string,
    isNested: boolean,
    prefix: string
): NavBarItem | LinkItem[] {
    const basename = getBaseName(directoryPath);
    const dirname = getDirName(directoryPath);
    const navBarItem: NavBarItem = {
        text: basename,
        collapsed: true,
        collapsible: true,
        items: [],
    };
    const linkItems: LinkItem[] = [];
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.name === "index.ts" || entry.isDirectory()) continue;
        const title = entry.name.slice(0, -3);
        const file: LinkItem = {
            text: title,
            link: isNested
                ? `${prefix}/${dirname}/${basename}/${title}`
                : `${dirname}/${basename}/${title}`,
        };
        isNested ? navBarItem.items.push(file) : linkItems.push(file);
    }
    if (Object.keys(tcDifficulties).includes(navBarItem.text)) {
        navBarItem.text += ` ${navBarItem.items.length} / ${tcDifficulties[navBarItem.text]}`;
    }
    return isNested ? navBarItem : linkItems;
}
export { readDirectory };
