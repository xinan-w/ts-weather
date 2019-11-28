// import axios from 'axios'
import axios, { AxiosResponse } from 'axios'
import colors from 'colors'
import commander from 'commander'
const program = new commander.Command()
program
    .version('0.1.0')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    program.outputHelp(colors.red);
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

// axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
//     .then((res)=>{
//         // (property) AxiosResponse<any>.data:any
//         console.log(colors.green(res.data))
//     })
const log = console.log;
axios.get(`${URL}?city=${encodeURI(program.city)}&key=${KEY}&extensions=base`)
    .then((res: AxiosResponse<IWeatherResponse>) => {
        // (property) IWeatherResponse.lives: ILive[]
        const live = res.data.lives[0]
        log(colors.rainbow(`${live}`))
        log(colors.yellow(`报道时间：${live.reporttime}`))
        log(colors.white(`省份：${live.province}`))
        log(colors.bgCyan(`城市：${live.city}`))
        log(colors.green(`天气：${live.weather}`))
        log(colors.bgYellow(`温度：${live.temperature}°C`))
    }).catch(()=>{
        log(colors.red('天气服务出现异常'))
    })
