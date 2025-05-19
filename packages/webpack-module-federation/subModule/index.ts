console.log('子应用启动');

// @ts-ignore
import('mainModule/run').then(module => {
	module.default();
});