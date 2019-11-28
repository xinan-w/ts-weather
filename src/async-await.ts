import colors from 'colors'
import axios from 'axios'
import commander from 'commander'

const command = commander
    .version('0.1.0')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

const URL = 'http://restapi.amap.com/v3/weather/weatherInfo'
const KEY = '50908fe3a5c05e8d40366ba2e20014cf'
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
