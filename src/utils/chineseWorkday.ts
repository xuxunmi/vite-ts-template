import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import localeData from 'dayjs/plugin/localeData'
import zh from 'dayjs/locale/zh-cn'
import { SelectInterface } from "@/interface/common"

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)
dayjs.extend(localeData)
dayjs.locale(zh)

const ww = require("chinese-workday")
const isWorkday = ww.isWorkday

/**
 * 检查日期是否为工作日
 * @param date 字符串日期 2024-05-14
 * @return boolean
 */
export const checkIsWorkday = (date: string) => {
    if (!date) return
    const isworkday = isWorkday(date)
    return isworkday
}

/**
 *将格式化日期转为本地星期几
 * @param {*} dateString：格式化日期：2024-02-21
 * @returns 星期四
 */
export const getDayOfWeekZh = (dateString: string): string => {
    const dayOfWeek = dayjs(dateString).locale('zh-cn').format('dddd')
    return dayOfWeek
}

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date, format: string | undefined = 'YYYY-MM-DD HH:mm:ss') => {
    if (!time) {
        return 'N/A'
    }
    const date = new Date(time)
    return dayjs(date).format(format)
}

/**
 * 获取一年的所有周总数
 * @param year 年份
 */
export const getWeeksInYear = (year: number) => {
    // 当前年份的第一个月
    const currentFirstMonth = dayjs().startOf('year').format('M')
    // console.log("currentFirstMonth: ", currentFirstMonth)
    // 当前年份的最后一个月
    const currentLastMonth = dayjs().endOf('year').format('MM')
    // console.log("currentLastMonth: ", currentLastMonth)
    // 当前年份的第一天
    const currentFirstDay = dayjs().startOf('year').format('D')
    // console.log("currentFirstDay: ", currentFirstDay)
    // 当前年份的最后一天
    const currentLastDay = dayjs().endOf('year').format('DD')
    // console.log("currentLastDay: ", currentLastDay)
    const firstDayOfYear = new Date(year, +currentFirstMonth, +currentFirstDay) // 获取指定年份的第一个月第一天
    const lastDayOfYear = new Date(year, +currentLastMonth, +currentLastDay) // 获取指定年份的最后一个月最后一天

    const firstWeekDay = firstDayOfYear.getDay() // 第一天是星期几
    const timeDiff = lastDayOfYear.getTime() - firstDayOfYear.getTime() // 日期之间的时间差（毫秒）
    const daysInYear = Math.floor(timeDiff / (24 * 60 * 60 * 1000)) + 1 // 一年中的总天数

    let weeks = Math.ceil((daysInYear + firstWeekDay) / 7) // 计算周数
    if (firstWeekDay === 0) {
        // 如果第一天是周日，则减少一周
        weeks--
    }

    return weeks
}

/**
 * 生成一年的所有周数组
 * @param year 年份
 */
export const createWeekInYear = (year?: number) => {
    type weekType = {
        from: string
        to: string
        name: string
        id: string
    }
    const y = year || dayjs().year()
    const currentYearWeeks: weekType[] = []
    const prevYearWeeks: weekType[] = []
    const prevWeeksNum = getWeeksInYear(y - 1)
    const currentWeeksNum = getWeeksInYear(y)

    // 上一年
    for (let i = 0; i < prevWeeksNum; i++) {
        const from = dayjs()
            .year(y - 1)
            .week(i)
            .weekday(1)
            .format('YYYY-MM-DD')
        const to = dayjs()
            .year(y - 1)
            .week(i)
            .weekday(7)
            .format('YYYY-MM-DD')
        const week: weekType = {
            from,
            to,
            name:
                dayjs()
                    .year(y - 1)
                    .format('YYYY') +
                '-' +
                `W${i + 1}(${from}—${to})`,
            id:
                dayjs()
                    .year(y - 1)
                    .format('YYYY') +
                '-' +
                (i + 1)
        }
        prevYearWeeks.push(week)
    }

    // 今年
    for (let i = 1; i <= currentWeeksNum; i++) {
        const from = dayjs().year(y).week(i).weekday(1).format('YYYY-MM-DD')
        const to = dayjs().year(y).week(i).weekday(7).format('YYYY-MM-DD')
        const week: weekType = {
            from,
            to,
            name: dayjs().year(y).format('YYYY') + '-' + `W${i}(${from}—${to})`,
            id: dayjs().year(y).format('YYYY') + '-' + i
        }
        if (from > dayjs().format('YYYY-MM-DD')) {
            break
        }
        currentYearWeeks.push(week)
    }
    // console.log("currentYearWeeks:", currentYearWeeks)
    // 取上一年后半年的周数据
    const prevHalfYearWeeks = prevYearWeeks.slice(Math.ceil(prevYearWeeks.length / 2))
    // 上一年和今年合并起来
    const weeksTotal: weekType[] = prevHalfYearWeeks.concat(currentYearWeeks)
    // console.log(" weeksTotal:", weeksTotal)
    return weeksTotal
}

/**
 * 生成指定年份的季度时间范围区间
 * @param year 年份
 */
export const createQuarterDateRange = (year: number) => {
    type quarterType = {
        from: string
        to: string
        name: string
        id: string
    }
    const y = year
    const quartersDateRange: quarterType[] = []
    for (let i = 1; i <= 4; i++) {
        const from = dayjs().year(y).quarter(i).startOf('quarter').format('YYYY-MM-DD')
        const to = dayjs().year(y).quarter(i).endOf('quarter').format('YYYY-MM-DD')
        const quarter: quarterType = {
            from,
            to,
            name: dayjs().year(y).format('YYYY') + '-' + `Q${i}(${from}—${to})`,
            id: dayjs().year(y).format('YYYY') + '-' + i
        }
        quartersDateRange.push(quarter)
    }
    return quartersDateRange
}

/**
 * 生成指定年份季度
 * @param year 年份
 */
export const generateQuarters = (year: number) => {
    if (!year) return []
    const quarters: SelectInterface[] = []
    for (let i = 1; i <= 4; i++) {
        quarters.push({
            id: i,
            name: `${year}年第${i}季度`
        })
    }
    return quarters
}