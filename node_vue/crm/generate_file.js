/**
 * fast add new module script
 */
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const resolve = file => path.resolve(__dirname, './src', file)
// symbol const
const RouterSymbol = Symbol('router'),
  	  ViewsSymbol = Symbol('pages')
//  root path
const rootPath = {
	[RouterSymbol]: resolve('router/modules'),
	[ViewsSymbol]: resolve('pages')
}
// loggs
const errorLog = error => console.log(chalk.red(`${error}`))
const defaultLog = log => console.log(chalk.green(`${log}`))
// module name
let moduleName = new String();
let fileType = new String();
// const string
const vueFile = module => (`
<template>
	<div class="content" :class="content-${module}"></div>
</template>
<script>
	export default {
		name: '${module}',
		data() {
			return {}
		},
		created() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">

</style>
`)

// route file
const routerFile = module => (`
	export default [{
		path: '/${module}',
		name: '${module}',
		component: () => import('')
	}]
`)

const generateFile = async (filePath, content, dirPath = '') => {
	try {
		// create file if file not exist
		if (dirPath !== '' && !await fs.existsSync(dirPath)) {
			await fs.mkdirSync(dirPath)
			defaultLog(`created ${dirPath}`)
		}

		if (!await fs.existsSync(filePath)) {
			await fs.openSync(filePath, 'w')
			defaultLog(`created ${filePath}`)
		}

		await fs.writeFileSync(filePath, content, 'utf8')

	} catch(error) {
		errorLog(error)
	}

}

// module-method map
const generates = new Map([
	['pages', async (module) => {
		// module file
		const filePath = path.join(rootPath[ViewsSymbol], module)
		const vuePath = path.join(filePath, './index.vue')
		await generateFile(vuePath, vueFile(module), filePath)
	}],
	// router is not need new folder
	['router', async (module) => {
		const routerPath = path.join(rootPath[RouterSymbol], `${module}.js`)
		await generateFile(routerPath, routerFile(module))
	}]
])

defaultLog(`请输入模块名称（英文）：`)
// files
const files = ['pages', 'router']
// 和命令行进行交互 获取的创建的模块名称
process.stdin.on('data', chunk => {
	try {
		if (!moduleName) {
			moduleName = chunk;
		} else {
			chunk = chunk.slice(0, -2)
			defaultLog(`new module name is ${chunk}`)

			files.forEach(async (el, index) => {
				// 执行创建语句
				await generates.get(`${el}`).call(null, chunk.toString())
				if (index === files.length - 1) {
					process.stdin.emit('end')
				}
			})
		}

	} catch(error) {
		errorLog(error)
	}
})

process.stdin.on('end', () => {
	defaultLog(`create module success`)
})