#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function getFileMode(mode) {
    if (isDir(mode)) {
        return 'd';
    }
    if (isFile(mode)) {
        return '-';
    }
    return '?';
}
function main() {
    const args = process.argv.slice(2);
    const { isList, isAll } = parseArgs(args);
    const files = node_fs_1.default.readdirSync('.').map(file => ({
        name: file,
        type: '-'
    }));
    let filterFiles = files;
    if (!isAll) {
        filterFiles = filterFiles.filter(file => !file.name.startsWith('.'));
    }
    if (isList) {
        filterFiles = filterFiles.map(fileInfo => {
            const stats = node_fs_1.default.statSync(fileInfo.name);
            const { mode } = stats;
            return {
                ...fileInfo,
                type: getFileMode(mode)
            };
        });
    }
    let output = '';
    if (!isList) {
        for (let i = 0; i < filterFiles.length; i++) {
            const file = filterFiles[i];
            output += file.name + '\t';
        }
    }
    else {
        for (let i = 0; i < filterFiles.length; i++) {
            const file = filterFiles[i];
            if (i === filterFiles.length - 1) {
                output += file.name;
            }
            else {
                output += file.name + '\n';
            }
        }
    }
    console.log(output);
}
main();
