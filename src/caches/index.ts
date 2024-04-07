const SYSTEM_CACHE_NAME = 'VITE-CACHE-KEY'

/** 缓存数据时用到的 Key */
class CacheKey {
    static readonly TOKEN = `${SYSTEM_CACHE_NAME}-token`
    static readonly ACTIVE_THEME_NAME = `${SYSTEM_CACHE_NAME}-active-theme-name-key`
    static readonly USER_INFO = `${SYSTEM_CACHE_NAME}-userInfo`
    static readonly DYNAMICS_MENU_LIST = `${SYSTEM_CACHE_NAME}-dynamics-menu-list`
    static readonly PERMISSIONS_BTN_LIST = `${SYSTEM_CACHE_NAME}-permissions-btn-list`
    static readonly LANGUAGE = `${SYSTEM_CACHE_NAME}-language`
}

export default CacheKey

/**
 * 使用：import CacheKey from "@/caches/cacheKey"
 * CacheKey.TOKEN
 */
