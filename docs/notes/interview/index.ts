import { readDirectory } from "../../utils";

export const interviewItems = readDirectory(__dirname, false, "notes");
