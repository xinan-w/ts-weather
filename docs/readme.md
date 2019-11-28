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
### 格式化命令
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

    灵活一点
        if (process.argv.slice(2).length === 0) {
            command.outputHelp()
            process.exit()
        }
```
### 添加色彩
```
    yarn add colors -D

```

### 处理网络请求
```
    处理完输入，终于可以写业务代码了，接下来我们使用 Promise 和 async 两种方式实现。
```
#### 定义接口
```
    http://restapi.amap.com/v3/weather/weatherInfo?key=你的key&city=成都
```
#### Promise
```
    可以引入现在最流行的 axios 来处理网络请求：
    yarn add axios

    然后使用经典的 Promise 写法：

        import axios from 'axios'
        import colors from 'colors'
        import commander from 'commander'

        const command = commander
            .version('0.1.0')
            .option('-c, --city [name]', 'Add city name')
            .parse(process.argv);

        if (process.argv.slice(2).length===0) {
            command.outputHelp(colors.red);
            process.exit();
        }

        interface IWeatherResponse {
            status: string
            count: string
            info: string
            infocode: string
            lives: ILive[]
        }

        interface ILive {
            province: string
            city: string
            adcode: string
            weather: string
            temperature: string
            winddirection: string
            windpower: string
            humidity: string
            reporttime: string
        }

        const URL = 'http://restapi.amap.com/v3/weather/weatherInfo'
        const KEY = '50908fe3a5c05e8d40366ba2e20014cf'

        axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
            .then((res)=>{
                // (property) AxiosResponse<any>.data:any
                console.log(colors.green(res.data))
            })

    此时，你会发现如果继续执行 res.data，是无法进行返回值提示的。

    如果你把光标移动到 res.data 的头上，你会看到 data 的类型是 any。为什么 TypeScript不能根据返回值自己推断出类型呢？
    因为 TypeScript 不够聪明，它并不能根据运行时进行推断，它只能在编译时根据上下文来猜测类型，但幸运的是，我们可以覆写 any ，像如下这样：

    import axios, { AxiosResponse } from 'axios'

    ...

    axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
    .then((res: AxiosResponse<IWeatherResponse>) => {
        // (property) IWeatherResponse.lives: ILive[]
        coonsole.log
    })

    这个时候你可以放心大胆地点下去了，享受自动补全的快乐。加一点颜色来格式化输出：

    const log = console.log;
    axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
    .then((res: AxiosResponse<IWeatherResponse>) => {
        // (property) IWeatherResponse.lives: ILive[]
        const live = res.data.lives[0]
        log(colors.rainbow(`${live}`))
        log(colors.yellow(`报道时间：${live.reporttime}`))
        log(colors.white(`省份：${live.province}`))
        log(colors.bgCyan(`城市：${live.city}`))
        log(colors.green(`天气：${live.weather}`))
        log(colors.bgYellow(`温度：${live.temperature}°C`))
    })

    一切好像又有点完美了，但似乎少了点什么。如果请求 API 少了点什么。如果请求 API 的时候出现异常，怎么办？目前没有处理！继续进行异常处理：

    .catch(()=>{
        log(colors.red('天气服务出现异常'))
    })
    这样才是一个完整的 Promise 使用，足够简健壮！
```
#### await 和 async
```
    接下来，我们来看一下 TypeScript 中，如何使用 await 和 async：
    const log = console.log
    async function getWeather(city: string) {
        try {
            const url = `${URL}?city=${encodeURI(city)}&key=${KEY}`
            const response = await axios.get(url)
            const live = response.data.lives[0]
            log(colors.yellow(live.reporttime))
            log(colors.white(`${live.province} ${live.city}`))
            log(colors.green(`${live.weather} ${live.temperature}`))
        } catch (error) {
            log(colors.red('天气服务出现异常'))
        }
    }

    getWeather(command.city)

    实际使用起来与JavaScript并没有什么不同，保持了非常强的一致性。