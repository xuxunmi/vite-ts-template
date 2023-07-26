import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { statusCodeErrorMessage } from './httpErrorCodeFun'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    timeout: 5000 //超时时间
})

//配置请求拦截器
instance.interceptors.request.use(
    //config:该参数表示当前请求的配置对象
    (config: InternalAxiosRequestConfig) => {
        // const token = getStorage('token', false)
        // if (token) {
        //     config.headers['Authorization'] = token
        // }
        //只针对get方式数组参数进行序列化
        if (config.method === 'get') {
            // 适用于 1.x版本以上
            config.paramsSerializer = {
                serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

//配置响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code !== 200) {
            // if (
            //     response.data instanceof Blob &&
            //     response.data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            // ) {
            //     return Promise.resolve(response.data)
            // }
            if (response.data.code === 401) {
                // store.dispatch('user/setToken', null);
                // removeStorage('setUserInfo', null)
                // removeStorage('token', false)
                // showErrorMsg(response.data.msg)
                // router.push({ path: '/login' })
                return
            }
            showErrorMsg(response.data.msg)
            return Promise.reject(response)
        }
        return response.data
    },
    (error: AxiosError) => {
        // 处理响应错误
        if (error && error.response) {
            let { status } = error.response
            error.message = statusCodeErrorMessage(status)
        }
        // 处理请求超时问题
        if (error.message.includes('timeout')) {
            error.message = '请求超时，请重新操作'
        }
        showErrorMsg(error.message)
        return Promise.reject(error.response || error)
    }
)

/**
 * 错误信息处理
 * @param {String} msg 错误信息
 */
const showErrorMsg = (msg: string) => {
    ElMessage({
        message: msg,
        type: 'error',
        center: true,
        dangerouslyUseHTMLString: true
    })
}

const request = {
    /**
     * 封装get方法
     * @param url
     * @param params
     * @returns {Promise}
     */
    get<T>(url: string, params: object = {}): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            // 第一种方式
            // instance
            //     .get(url, { params: params })
            //     .then((response: AxiosResponse<T>) => {
            //         resolve(response.data)
            //     })
            //     .catch((error: AxiosError) => {
            //         reject(error)
            //     })

            // 第二种方式
            try {
                const response: AxiosResponse<T> = await instance.get(url, { params: params })
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    },
    /**
     * 封装post请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    post<T>(url: string, data: object = {}): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            instance
                .post(url, JSON.stringify(data))
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
    /**
     * 封装put请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    put<T>(url: string, data: object = {}): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            instance
                .put(url, data)
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
    /**
     * 封装upload请求
     * @param url
     * @param formData: new FormData()格式
     * @returns {Promise}
     */
    upload<T>(url: string, formData: FormData): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            instance
                .post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
    /**
     * 封装下载文件流请求
     * @param url
     * @param params
     * @fileName 下载文件名
     * @returns {Promise}
     */
    downBlobFile<T>(url: string, params: object = {}, fileName: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            instance
                .get(url, { params: params, responseType: 'blob' })
                .then((response: AxiosResponse<Blob>) => {
                    const blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    })
                    if (blob && blob.size === 0) {
                        showErrorMsg('内容为空，无法下载')
                        return
                    }
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = fileName
                    document.body.appendChild(link)
                    link.click()
                    window.setTimeout(function () {
                        document.body.removeChild(link)
                        URL.revokeObjectURL(link.href)
                    }, 0)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
    /**
     * 封装delete方法
     * @param url
     * @param params
     * @returns {Promise}
     */
    delete<T>(url: string, params: object = {}): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            instance
                .delete(url, { params: params })
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
    /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    patch<T>(url: string, data: Object = {}): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            instance
                .patch(url, data)
                .then((response: AxiosResponse) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }
}

export default request
