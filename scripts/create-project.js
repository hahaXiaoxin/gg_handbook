#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 模板配置
const templates = {
  browser: {
    name: 'browser',
    description: 'Browser TypeScript project template'
  },
  node: {
    name: 'node',
    description: 'Node.js TypeScript project template'
  }
};

// 获取命令行参数
const args = process.argv.slice(2);
const projectType = args[0];
const projectName = args[1];

if (!projectType || !projectName) {
  console.log('Usage: pnpm create <type> <name>');
  console.log('Types:');
  Object.entries(templates).forEach(([key, value]) => {
    console.log(`  ${key}: ${value.description}`);
  });
  process.exit(1);
}

if (!templates[projectType]) {
  console.error(`Error: Unknown project type "${projectType}"`);
  process.exit(1);
}

// 创建项目目录
const projectPath = path.join(process.cwd(), 'packages', projectName);
if (fs.existsSync(projectPath)) {
  console.error(`Error: Project "${projectName}" already exists`);
  process.exit(1);
}

// 复制模板
const templatePath = path.join(process.cwd(), 'templates', templates[projectType].name);
console.log(`Creating new ${projectType} project "${projectName}"...`);

// 创建项目目录
fs.mkdirSync(projectPath, { recursive: true });
fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });

// 复制并修改 package.json
const packageJson = require(path.join(templatePath, 'package.json'));
packageJson.name = `@gg-handbook/${projectName}`;
fs.writeFileSync(
  path.join(projectPath, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// 复制 tsconfig.json
fs.copyFileSync(
  path.join(templatePath, 'tsconfig.json'),
  path.join(projectPath, 'tsconfig.json')
);

// 创建示例文件
const exampleContent = projectType === 'browser' 
  ? `// Browser TypeScript Example
console.log('Hello from ${projectName}!');`
  : `// Node.js TypeScript Example
console.log('Hello from ${projectName}!');`;

fs.writeFileSync(
  path.join(projectPath, 'src', 'index.ts'),
  exampleContent
);

console.log(`
Project "${projectName}" created successfully!

Next steps:
  cd packages/${projectName}
  pnpm install
  pnpm dev
`); 