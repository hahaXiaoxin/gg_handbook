#!/usr/bin/env node

/**
 * fileName: gg_ls.ts
 * 
 * 实现 ls 命令
 * 支持 -l -a 参数
 */
import fs from 'node:fs';
import { parseArgs } from './utils';
import FileObj from './FileObj';

function main() {
	const args = process.argv.slice(2);
	const { isList, isAll } = parseArgs(args);

	// 获取当前目录下的文件
	const files = fs.readdirSync('.').map(file => (new FileObj(file)));

	let filterFiles = files;

	if (!isAll) {
		filterFiles = filterFiles.filter(file => !file.name.startsWith('.'));
	}

	const outputList = filterFiles.map(file => file.output(isList)).join(isList ? '\n' : '\t');

	console.log(outputList);
}


main();