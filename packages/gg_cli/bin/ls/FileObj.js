"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const utils_1 = require("./utils");
const node_os_1 = __importDefault(require("node:os"));
const node_child_process_1 = __importDefault(require("node:child_process"));
class FileObj {
    constructor(name) {
        this.name = name;
        const stats = node_fs_1.default.statSync(name);
        this._stats = stats;
    }
    getFileType() {
        if (this._type) {
            return this._type;
        }
        this._type = '?';
        if ((0, utils_1.isDir)(this.mode)) {
            this._type = 'd';
        }
        if ((0, utils_1.isFile)(this.mode)) {
            this._type = '-';
        }
        return this._type;
    }
    getAuth() {
        if (this._auth) {
            return this._auth;
        }
        const mode = this.mode;
        const userCanRead = (mode & node_fs_1.default.constants.S_IRUSR) ? 'r' : '-';
        const userCanWrite = (mode & node_fs_1.default.constants.S_IWUSR) ? 'w' : '-';
        const userCanExecute = (mode & node_fs_1.default.constants.S_IXUSR) ? 'x' : '-';
        const groupCanRead = (mode & node_fs_1.default.constants.S_IRGRP) ? 'r' : '-';
        const groupCanWrite = (mode & node_fs_1.default.constants.S_IWGRP) ? 'w' : '-';
        const groupCanExecute = (mode & node_fs_1.default.constants.S_IXGRP) ? 'x' : '-';
        const otherCanRead = (mode & node_fs_1.default.constants.S_IROTH) ? 'r' : '-';
        const otherCanWrite = (mode & node_fs_1.default.constants.S_IWOTH) ? 'w' : '-';
        const otherCanExecute = (mode & node_fs_1.default.constants.S_IXOTH) ? 'x' : '-';
        this._auth = `${userCanRead}${userCanWrite}${userCanExecute}${groupCanRead}${groupCanWrite}${groupCanExecute}${otherCanRead}${otherCanWrite}${otherCanExecute}`;
        return this._auth;
    }
    getUserInfo() {
        if (this._userInfo) {
            return this._userInfo;
        }
        if (node_os_1.default.type() !== 'Linux' && node_os_1.default.type() !== 'macOS') {
            this._userInfo = {
                uid: 0,
                gid: 0,
                username: 'root',
            };
            return this._userInfo;
        }
        const stats = this._stats;
        const { uid, gid } = stats;
        const userName = node_child_process_1.default.execSync(`id -un ${uid}`).toString().trim();
        this._userInfo = {
            uid,
            gid,
            username: userName,
        };
        return this._userInfo;
    }
    get mode() {
        if (!this._mode) {
            this._mode = this._stats.mode;
        }
        return this._mode;
    }
    get type() {
        return this.getFileType();
    }
    get auth() {
        return this.getAuth();
    }
    get nLink() {
        if (!this._nLink) {
            this._nLink = this._stats.nlink;
        }
        return this._nLink;
    }
    get size() {
        if (!this._size) {
            this._size = this._stats.size;
        }
        return this._size;
    }
    get mtime() {
        if (!this._mtime) {
            this._mtime = this._stats.mtime.getTime();
        }
        return this._mtime;
    }
    output(isList) {
        if (!isList) {
            return this.name;
        }
        const userInfo = this.getUserInfo();
        return `${this.type}${this.auth}  ${this.nLink}  ${userInfo.username}  ${userInfo.gid}  ${this.size}  ${new Date(this.mtime).getMonth() + 1}月  ${this.name}${this.type === 'd' ? '/' : ''}`;
    }
}
exports.default = FileObj;
