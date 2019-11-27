### 初始化项目
```
    mkdir 5-ts-weather

    touch index.ts

    yarn add ts-node typescript -D

    yarn ts-node index.ts
```
### 配置TSConfig
```
    yarn tsc -init
    本次项目实践中，我们主要讲解 targer、module、strict 和 esModuleInterop 四个默认开启项：
        target：指 TypeScript 源代码编译后的 JavaScript 版本。
        Module：当前代码的组织形式。
        strict：指开启 JavaScript 的严格模式。
        esModuleInterop：指允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。
```
### 配置 TSLint
```
    TSLint 是 TypeScript 代码的样式风格检查工具。类似于 JavaScript 的 ESLint，或者Ruby的Rubocop。

    yarn add tslint -D
    安装完成后，与  TSConfig 一样，也可以使用命令初始化 TSLint 的配置工具：
    yarn tslint --init
```
### 使用git
```
    添加 husky
    yarn add husky -D
    {
        "devDependencies": {
            "husky": "^3.1.0",
            "ts-node": "^8.5.2",
            "tslint": "^5.20.1",
            "typescript": "^3.7.2"
        },
        "husky": {
            "hooks": {
            "pre-commit": "yarn tslint -c tslint.json'./**/*.ts'"
            }
        }
    }
```
#### 格式化命令
```
    Git是支持很多命令的，可以支持版本查询（--version），可以支持路径（--exec-path）
    我们的天气应用开发同理，也需要支持命令的可拓展性。

    Commander.js就是这样一个简单的方案。好的我们试一下吧：
        yarn add commander
    
    打开 index.ts，根据 Commander.js 的 Readme.md，我们可以这样试一试
        commander
        .version('0.1.0')
        .option('-p, --peppers', 'Add peppers')
        .option('-P, --pineapple', 'Add pineapple')
        .option('-b, --bbp-sauce', 'Add bbq sauce')
        .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
        // [ts] Cannot find name 'process'
        .parse(proccess.argv)
    虽然我们直接复制了实例代码里的内容，但是 TypeScript 表示并不知道 process 是什么。这是因为 TypeScript 本身并没有 Node.js 的类型消息，我们可以依靠 @types 来导入，如下所示：
        yarn add @types/node
    从这里我们得知第三方库的类型消息，我们可以在 @types 中查找并引入。但如果没有呢？就需要我们自己来定义了，这留到后面再讲解。

    我们现在可以先执行以下代码：
        yarn ts-node src/index.ts -h
    如果我不加 -h 呢：
        yarn ts-node src/index.ts
    什么输出都没有
    下面我们来了解一下，如何更好地进行输入输出。
    https://github.com/yingxiangjipo/commander.js/blob/master/Readme.md

    







```