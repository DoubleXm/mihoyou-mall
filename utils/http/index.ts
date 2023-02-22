import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from 'axios'

export interface CreateAxiosOptions {
  baseURL?: string
  timeout?: number
}

export interface Result<T = any> {
  data: T
  message: 'OK'
  retcode: number
}

class AxiosImpl {
  private axiosInstance: AxiosInstance
  private options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  /**
   * @description  请求拦截
   */
  interceptorsRequest() {
    this.axiosInstance.interceptors.request.use((config) => {
      if (config.method !== 'GET' && config.url?.includes('Api'))
        config.headers['Content-Type'] = 'multipart/form-data'

      return config
    })
  }

  /**
   * @description  相应拦截
   */
  interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(res => res.data)
  }

  /**
   * @description  请求方法
   */
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res)
          if (!isCancel) {
            try {
              resolve(res as unknown as Promise<T>)
            }
            catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}

const http = new AxiosImpl({ baseURL: '/api', timeout: 10000 })
const accountHttp = new AxiosImpl({ baseURL: '/account-api', timeout: 10000 })
const passportHttp = new AxiosImpl({ baseURL: '/passport-api', timeout: 10000 })

export {
  http,
  accountHttp,
  passportHttp,
}
