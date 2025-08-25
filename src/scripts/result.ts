// declare interface FileResult {
//     title: string;
//     location: string;
//     extension: string;
//     size: number;
// }
//
// declare interface ProgramResult {
//     title: string;
//     isSys: boolean;
//     location: string;
//     image: string;
// }
//
// declare type Result = FileResult | ProgramResult;
//
// function createFileResult(title: string, location: string, params: { extension: string; size: number }): FileResult {
//     return {
//         action: ["open", "locate", "delete", "grant"],
//         title,
//         location,
//         extension: params.extension,
//         size: params.size,
//     };
// }
//
// function createProgramResult(title: string, location: string, params: { image: string; isSys: boolean }): ProgramResult {
//     return {
//         action: ["open", "locate", "uninstall", "grant"],
//         title,
//         location,
//         image: params.image,
//         isSys: params.isSys,
//     };
// }
//
// function result(title: string, location: string, params: { extension?: string; size?: number; image?: string; isSys?: boolean }): Result {
//     if (params.extension && params.size) {
//         return createFileResult(title, location, { extension: params.extension, size: params.size });
//     }
//
//     if (params.image && params.isSys !== undefined) {
//         return createProgramResult(title, location, { image: params.image, isSys: params.isSys });
//     }
//
//     throw new Error("Invalid parameters: must include either 'extension & size' or 'image & isSys'.");
// }
//
// export const testResults = [
//     result("test.js", "C:/", {size: 123, extension: "elo"}),
//     result("Apple Music", "C:/Program Files/", {image: "test.png", isSys: false}),
//     result("Task Manager", "C:/System32/", {image: "mgr.png", isSys: true}),
// ] as const;
//
