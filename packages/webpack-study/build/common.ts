import path from 'path';

/**
 * 获取入口文件路径
 * @param pageName 
 * @returns 
 */
export function getEntryPath(pageName: string) {
    return path.resolve(process.cwd(), `src/pages/${pageName}/index.ts`);
}

/**
 * 获取模板文件路径
 * @param pageName 
 * @returns 
 */
export function getTemplatePath(pageName: string) {
    return path.resolve(process.cwd(), `src/pages/${pageName}/index.html`);
}