const SYSTEM_CACHE_NAME = 'VITE-CACHE-KEY'

/** 缓存数据时用到的 Key */
class CacheKey {
    static readonly TOKEN = `${SYSTEM_CACHE_NAME}-token`
    static readonly USER_INFO = `${SYSTEM_CACHE_NAME}-userInfo`
    static readonly SIDEBAR_STATUS = `${SYSTEM_CACHE_NAME}-sidebar-status-key`
    static readonly ACTIVE_THEME_NAME = `${SYSTEM_CACHE_NAME}-active-theme-name-key`
}

export default CacheKey

/**
 * 使用：import CacheKey from "@/caches/cacheKey"
 * CacheKey.TOKEN
 */
