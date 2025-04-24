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
