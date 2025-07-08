"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = parseArgs;
exports.isDir = isDir;
exports.isFile = isFile;
const node_fs_1 = __importDefault(require("node:fs"));
function parseArgs(args) {
    let isList = false;
    let isAll = false;
    args.filter(arg => arg.startsWith('-')).forEach(arg => {
        arg.includes('l') && (isList = true);
        arg.includes('a') && (isAll = true);
    });
    return { isList, isAll };
}
function isDir(mode) {
    return (mode & node_fs_1.default.constants.S_IFDIR) === node_fs_1.default.constants.S_IFDIR;
}
function isFile(mode) {
    return (mode & node_fs_1.default.constants.S_IFREG) === node_fs_1.default.constants.S_IFREG;
}
