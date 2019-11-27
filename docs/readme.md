#初始化项目
```
    mkdir 5-ts-weather

    touch index.ts

    yarn add ts-node typescript -D

    yarn ts-node index.ts
```
# 配置TSConfig
```
    yarn tsc -init
    本次项目实践中，我们主要讲解 targer、module、strict 和 esModuleInterop 四个默认开启项：
        target：指 TypeScript 源代码编译后的 JavaScript 版本。
        Module：当前代码的组织形式。
        strict：指开启 JavaScript 的严格模式。
        esModuleInterop：指允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。
```
# 配置 TSLint
```
    TSLint 是 TypeScript 代码的样式风格检查工具。类似于 JavaScript 的 ESLint，或者Ruby的Rubocop。

    yarn add tslint -D
    安装完成后，与  TSConfig 一样，也可以使用命令初始化 TSLint 的配置工具：
    yarn tslint --init
```
# 使用git
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

