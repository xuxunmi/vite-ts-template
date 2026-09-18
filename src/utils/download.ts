import axios, { AxiosResponse } from 'axios'
import ExportJsonExcel from "js-export-excel"
import dayjs from 'dayjs'

const currentDateTime = computed(() => {
    return dayjs(new Date()).format('YYYY-MM-DD')
})

/**
 * @description:导出下载模板
 * @param {String} 下载url
 * @param {String} 下载文件名
 */
export function downloadBlobFileTemplate(url: string, filename: string) {
    return axios({
        url: url,
        method: "GET",
        responseType: "blob"
    }).then((response: AxiosResponse) => {
        console.log("response: ", response)
        const blob = new Blob([response.data])
        const link = document.createElement("a")
        const objectUrl = URL.createObjectURL(blob)
        link.href = objectUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        window.setTimeout(() => {
            URL.revokeObjectURL(objectUrl)
            document.body.removeChild(link)
        }, 0)
    })
}


/**
 * 下载文件（需要后端指定文件流的下载类型）
 * @param {String} data blob数据
 * @param {String} filename 文件名称
 * @param {String} time 时间
 */
export function downloadFile1(data: any, filename: string, time: string | undefined) {
    if (!data) return
    const link = document.createElement('a')
    link.href = URL.createObjectURL(data as Blob)
    link.download = time ? `${filename}_${time}` : `${filename}_${currentDateTime.value}`
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
    }, 0)
}

/**
 * 下载文件
 * @param {String} data blob数据
 * @param {String} filename 文件名称含文件后缀
 * @param {String} type 文件类型
 */
export function downloadFile2(data: any, filename: string, type?: string) {
    if (!data) return
    // 当Blob的type为: application/octet-stream 时，指定为.xlsx类型
    let blob
    switch (type) {
        case "xlsx":
            blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
            break

        default:
            blob = data
            break
    }
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob as Blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
    }, 0)
}

/**
 * 前端导出Excel文件
 * @param {Array} data - 表格数据
 * @param {Array} columns - 表头配置
 * @param {string} fileName - 导出的文件名
 */
export function exportExcel(data: any[], columns: any[], fileName = "导出Excel") {
    const option = {
        fileName, // 文件名
        datas: [
            {
                sheetHeader: columns, // 表头
                sheetData: data, // 表格数据
                columnWidths: new Array(columns.length).fill(5) // 列宽
            }
        ]
    }

    const toExcel = new ExportJsonExcel(option) // 创建导出实例
    toExcel.saveExcel() // 保存并下载 Excel 文件
}
