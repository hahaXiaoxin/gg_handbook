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
function main() {
    const args = process.argv.slice(2);
    const { isList, isAll } = parseArgs(args);
    const files = node_fs_1.default.readdirSync('.', { withFileTypes: true });
    if (!isList && !isAll) {
        const res = files.filter(file => !file.name.startsWith('.')).reduce((pre, file) => {
            return pre + file.name + '\t';
        }, '');
        console.log(res);
        return;
    }
    else if (isAll && !isList) {
        const res = files.reduce((pre, file) => {
            return pre + file.name + '\t';
        }, '.\t..\t');
        console.log(res);
    }
}
main();
