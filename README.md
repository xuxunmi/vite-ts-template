# vue3+ts+template

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

# Vue 3 + Typescript + Vite

本项目旨在是学习 Vite、ts 语法和 Vue3
基于 vite + ts + less + Element-Plus 搭建的项目

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Git 提交规范

```sh
feat: 新功能(feature)
fix: 修复(bug fix)
docs: 修改文档 (documentation)
style: 代码格式(不影响代码运行的变动)
refactor: 代码重构(即不是新增功能，也不是修改bug的代码变动)
perf: 改善性能(即优化相关代码或性能)
revert: 代码回退
test: 增加测试
chore: 构建过程或辅助工具的变动
```

//
// Created by sl on 2023/3/1.
//
// (一)本代码的质量保证期（简称“质保期”）为上线内 3 个月，质保期内乙方对所代码实行包修改服务。
// (二)本代码提供三包服务（包阅读、包编译、包运行）不包熟
// (三)本代码所有解释权归权归佛祖所有，禁止未开光盲目上线
// (四)请严格按照保养手册对代码进行保养，本代码特点：
// i. 运行在风电、水电的机器上
// ii. 机器机头朝东，比较喜欢太阳的照射
// iii. 集成此代码的人员，应拒绝黄赌毒，容易诱发本代码性能越来越弱
// 声明：未履行将视为自主放弃质保期，本人不承担对此产生的一切法律后果
// 如有问题，欢迎访问: https://github.com/xuxunmi?tab=repositories
// _oo0oo_
// o8888888o
// 88" . "88
// (| -\_- |)
// 0\ = /0
// **\_/`---'\_**
// .' \\| |// '.
// / \\||| : |||// \
// / _||||| -:- |||||- \
// | | \\\ - /// | |
// | \_| ''\---/'' |_/ |
// \ .-\_\_ '-' **_/-. /
// _**'. .' /--.--\ `. .'___
//          ."" '<  `.**_\_<|>_/\_**.' >' "".
// | | : `- \`.;`\ _ /`;.`/ - ` : | |
// \ \ `_.   \_ __\ /__ _/   .-` / /
// =====`-.____`.**\_ \_\_\_**/**_.-`_**.-'=====
// `=---='
//
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// 佛祖保佑 永无 BUG

```

```
