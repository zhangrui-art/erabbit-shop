import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const timeout = 10000

// 添加拦截器
const requestInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http') && !options.url.startsWith('https')) {
      options.url = baseURL + options.url
    }
    options.timeout = timeout
    options.header = {
      ...options.header,
      'source-client': 'miniapp', // 请求头
    }
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    token && (options.header.Authorization = token)
  },
}

uni.addInterceptor('request', requestInterceptor)
uni.addInterceptor('uploadFile', requestInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 清理用户信息跳转登录页
          useMemberStore().clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(error) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(error)
      },
    })
  })
}
