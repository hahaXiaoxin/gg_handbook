import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	root: '.', // 或你的实际 root
	build: {
	  outDir: 'dist',
	  minify: false, // 关闭压缩
	  sourcemap: true, // 生成 source map，方便调试
	  rollupOptions: {
		output: {
		  // 保持代码结构，关闭 tree-shaking
		  manualChunks: undefined,
		  inlineDynamicImports: true,
		}
	  }
	}
  });