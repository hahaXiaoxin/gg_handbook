#!/usr/bin/env node

/**
 * fileName: gg_ls.ts
 * 
 * 实现 ls 命令
 * 支持 -l -a 参数
 */
import fs from 'node:fs';

/**
 * 解析参数
 * @param args 命令行传入的参数 
 * @returns 
 */
function parseArgs(args: string[]): {
	isList: boolean;
	isAll: boolean;
} {
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

	// 获取当前目录下的文件
	const files = fs.readdirSync('.', {withFileTypes: true});

	if (!isList && !isAll) {
		const res = files.filter(file => !file.name.startsWith('.')).reduce((pre, file) => {
			return pre + file.name + '\t';
		}, '');

		console.log(res);

		return;
	}else if (isAll && !isList) {
		const res = files.reduce((pre, file) => {
			return pre + file.name + '\t';
		}, '.\t..\t');

		console.log(res);
	}
}


main();