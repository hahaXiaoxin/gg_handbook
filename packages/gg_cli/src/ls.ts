#!/usr/bin/env node

/**
 * fileName: gg_ls.ts
 * 
 * 实现 ls 命令
 * 支持 -l -a 参数
 */
import fs from 'node:fs';

type FileType = 'd' | '-' | '?';

interface FileInfo {
	name: string;
	type: FileType
}

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

/**
 * 判断文件mode是否为目录
 * @param mode 
 * @returns 
 */
function isDir(mode: number) {
	return (mode & fs.constants.S_IFDIR) === fs.constants.S_IFDIR;
}

/**
 * 判断文件mode是否为文件
 * @param mode 
 * @returns 
 */
function isFile(mode: number) {
	return (mode & fs.constants.S_IFREG) === fs.constants.S_IFREG;
}

function getFileMode(mode: number): FileType {
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

	// 获取当前目录下的文件
	const files: FileInfo[] = fs.readdirSync('.').map(file => ({
		name: file,
		type: '-'
	}));

	let filterFiles = files;

	if (!isAll) {
		filterFiles = filterFiles.filter(file => !file.name.startsWith('.'));
	}

	// 如果携带l参数，则需要获取文件的详细信息
	if (isList) {
		filterFiles = filterFiles.map(fileInfo => {
			const stats = fs.statSync(fileInfo.name);
			const { mode } = stats;

			return {
				...fileInfo,
				type: getFileMode(mode)
			}
		})
	}

	let output = '';
	// 如果没有携带l参数，则直接输出
	if (!isList) {
		for (let i = 0; i < filterFiles.length; i++) {
			const file = filterFiles[i];
			output += file.name + '\t';
		}
	} else {
		for (let i = 0; i < filterFiles.length; i++) {
			const file = filterFiles[i];
	
			if (i === filterFiles.length - 1) {
				output += file.name;
			} else {
				output += file.name + '\n';
			}
		}
	}

	console.log(output);
}


main();