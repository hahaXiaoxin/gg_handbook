import fs from 'node:fs';
import { FileType } from './type';

/**
 * 解析参数
 * @param args 命令行传入的参数 
 * @returns 
 */
export function parseArgs(args: string[]): {
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
export function isDir(mode: number) {
	return (mode & fs.constants.S_IFDIR) === fs.constants.S_IFDIR;
}

/**
 * 判断文件mode是否为文件
 * @param mode 
 * @returns 
 */
export function isFile(mode: number) {
	return (mode & fs.constants.S_IFREG) === fs.constants.S_IFREG;
}