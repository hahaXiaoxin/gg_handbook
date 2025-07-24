import { FileType } from "./type";
import fs from 'node:fs';
import { isDir, isFile } from "./utils";
import os from 'node:os';
import child_process from 'node:child_process';

class FileObj {
	private _stats: fs.Stats;
	private _mode: number | undefined;
	private _nLink: number | undefined;
	private _type: FileType | undefined;
	private _auth: string | undefined;
	private _size: number | undefined;
	private _mtime: number | undefined;
	private _userInfo: {
		uid: number;
		gid: number;
		username: string;
	} | undefined;

	public name: string;

	constructor(name: string) {
		this.name = name;

		const stats = fs.statSync(name);

		this._stats = stats;
	}

	/**
	 * 获取文件类型的描述字符串
	 * @param mode 
	 * @returns 
	 */
	private getFileType() {
		if (this._type) {
			return this._type;
		}

		this._type = '?';

		if (isDir(this.mode)) {
			this._type = 'd';
		}

		if (isFile(this.mode)) {
			this._type = '-';
		}

		return this._type;
	}

	/**
	 * 获取文件权限
	 * @param mode 
	 */
	private getAuth() {
		if (this._auth) {
			return this._auth;
		}

		const mode = this.mode;

		// user.read
		const userCanRead = (mode & fs.constants.S_IRUSR) ? 'r' : '-';
		const userCanWrite = (mode & fs.constants.S_IWUSR) ? 'w' : '-';
		const userCanExecute = (mode & fs.constants.S_IXUSR) ? 'x' : '-';

		// group.read
		const groupCanRead = (mode & fs.constants.S_IRGRP) ? 'r' : '-';
		const groupCanWrite = (mode & fs.constants.S_IWGRP) ? 'w' : '-';
		const groupCanExecute = (mode & fs.constants.S_IXGRP) ? 'x' : '-';

		// other.read
		const otherCanRead = (mode & fs.constants.S_IROTH) ? 'r' : '-';
		const otherCanWrite = (mode & fs.constants.S_IWOTH) ? 'w' : '-';
		const otherCanExecute = (mode & fs.constants.S_IXOTH) ? 'x' : '-';

		this._auth = `${userCanRead}${userCanWrite}${userCanExecute}${groupCanRead}${groupCanWrite}${groupCanExecute}${otherCanRead}${otherCanWrite}${otherCanExecute}`;

		return this._auth;
	}

	/**
	 * 获取文件用户信息（windows貌似无效）
	 */
	private getUserInfo() {
		if (this._userInfo) {
			return this._userInfo;
		}

		if (os.type() !== 'Linux' && os.type() !== 'macOS') {
			this._userInfo = {
				uid: 0,
				gid: 0,
				username: 'root',
			}

			return this._userInfo;
		}

		const stats = this._stats;

		const {uid, gid} = stats;

		const userName = child_process.execSync(`id -un ${uid}`).toString().trim();

		this._userInfo = {
			uid,
			gid,
			username: userName,
		}

		return this._userInfo;
	}

	/**
	 * 获取文件权限
	 */
	public get mode() {
		if (!this._mode) {
			this._mode = this._stats.mode;
		}

		return this._mode;
	}

	/**
	 * 获取文件类型
	 */
	public get type() {
		return this.getFileType();
	}

	/**
	 * 获取文件权限
	 */
	public get auth() {
		return this.getAuth();
	}

	/**
	 * 获取文件链接数
	 */
	public get nLink() {
		if (!this._nLink) {
			this._nLink = this._stats.nlink;
		}

		return this._nLink;
	}

	public get size() {
		if (!this._size) {
			this._size = this._stats.size;
		}

		return this._size;
	}

	public get mtime() {
		if (!this._mtime) {
			this._mtime = this._stats.mtime.getTime();
		}

		return this._mtime;
	}

	public output(isList: boolean) {
		if (!isList) {
			return this.name;
		}

		const userInfo = this.getUserInfo();

		return `${this.type}${this.auth}  ${this.nLink}  ${userInfo.username}  ${userInfo.gid}  ${this.size}  ${new Date(this.mtime).getMonth() + 1}月  ${this.name}${this.type === 'd' ? '/' : ''}`;
	}
}

export default FileObj;

