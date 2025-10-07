---
date : '2025-10-01T22:14:53+08:00'
draft : false
title : 'nextjs-blog'
---
## start
去使用npx初始化一个nextjs项目
```
~/Codes/node ❯ npx create-next-app@latest                                                                                                 22:11:31
Need to install the following packages:
create-next-app@15.5.4
Ok to proceed? (y) y

✔ What is your project named? … my-app
✔ Would you like to use TypeScript? … No / Yes
✔ Which linter would you like to use? › ESLint
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
Creating a new Next.js app in /Users/spriple/Codes/node/my-app.
```
解析一些上面的这些配置选项
- TypeScript是语言，相对于js多了类型啥的
- Tailwind CSS是一种CSS的流行方案，提供很多好看的样式方案
- src/是指我的核心代码基本都在src文件夹中
- App Router是一套路由系统
然后通过查看packages.json可以看到可以执行的命令
```json
"scripts": {

"dev": "next dev --turbopack",

"build": "next build --turbopack",

"start": "next start",

"lint": "eslint"

}
```
因此我们可以使用下面几个命令执行一些操作
```
npm run dev 
npm run build 将整个项目打包
npm start 打包好了之后启动项目
```

## router defination
首先/，nextjs寻找的是src/app下面的page.js文件这里的内容大概是这样
```javascript
import React from 'react'

export default function Page() {
	return (
		<div>
		Hello World
		</div>
	)
}
```
会使用return注入一些html代码，这些html就定义了前端长啥样
然后如果是/subrouter,那nextjs会寻找src/app/subrouter下面的page.js文件，内容和上面差不多，基本都是这个路数

上面的page.js的后缀是可以变的，比如可以是page.tsx
## layout
root layout 定义在src/app/layout.tsx中，作用于整个网站的所有网页
然后每一个文件中可以有一个layout，作用于这个文件下面的所有page.tsx中的内容

### global css
flex and grid layout
## template
template.tsx默认会插入到layout中
在路由变化之后，template会回到初始状态，而layout的内容会保持状态

## font custmize
variable and className
two way to solve the font problem
className is more easy
## troubles
1. 使用npm run build的时候看到了这个报错
```
> Build error occurred
[Error: Turbopack build failed with 1 errors:
[next]/internal/font/google/geist_a71539c9.module.css
next/font: error:
Failed to fetch `Geist` from Google Fonts.

]
```
看起来是没办法下载css文件中需要使用的字体，所以给终端加一个代理就行了
2. 制作好header之后，制作page的展示笔记的界面的时候，header会遮挡住内容，导致笔记的路由无法点击


**If you have some problem with my blog, feel free to contact me via yiquanfeng@qq.com**
