#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const utils_1 = require("./utils");
const FileObj_1 = __importDefault(require("./FileObj"));
function main() {
    const args = process.argv.slice(2);
    const { isList, isAll } = (0, utils_1.parseArgs)(args);
    const files = node_fs_1.default.readdirSync('.').map(file => (new FileObj_1.default(file)));
    let filterFiles = files;
    if (!isAll) {
        filterFiles = filterFiles.filter(file => !file.name.startsWith('.'));
    }
    const outputList = filterFiles.map(file => file.output(isList)).join(isList ? '\n' : '\t');
    console.log(outputList);
}
main();
