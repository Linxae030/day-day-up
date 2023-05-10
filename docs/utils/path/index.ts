import * as path from "path";
export const getBaseName = (dir: string) => {
    return path.basename(dir);
};
export const getDirName = (dir: string) => {
    return path.basename(path.dirname(dir));
};
