import axios from "axios"
import dayjs from "dayjs"

const currentDateTime = computed(() => {
    return dayjs(new Date()).format("YYYY-MM-DD")
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
    }).then((response) => {
        console.log("response: ", response)
        const blob = new Blob([response.data])
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = filename
        const body = document.getElementsByTagName("body")[0]
        body.appendChild(link)
        link.click()
        window.setTimeout(function () {
            URL.revokeObjectURL(link.href)
            body.removeChild(link)
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
    const link = document.createElement("a")
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
 * @param {String} time 时间
 */
export function downloadFile2(data: any, filename: string) {
    if (!data) return
    const link = document.createElement("a")
    link.href = URL.createObjectURL(data as Blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
    }, 0)
}