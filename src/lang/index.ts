import i18n from "./i18n"
/**
 * 菜单导航，页面国际化
 * @param {title} string：routeTitle('系统日志')
 * @returns
 */
export const routeTitle = (title: string) => {
    const hasKey = i18n.global.te("routes." + title)
    if (hasKey) {
        const translateTitle = i18n.global.t("routes." + title)
        return translateTitle
    }
    return title
}

/**
 * 如果是js文件，直接全局使用this.$t
 * 菜单导航，页面国际化
 * @param {title} string：routeTitle('系统日志')
 * @returns
 */
// export const routeTitle = (title: string) => {
//     const hasKey = this.$te("routes." + title)
//     if (hasKey) {
//         const translateTitle = this.$t("routes." + title)
//         return translateTitle
//     }
//     return title
// }
