import axios from "axios"

export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://localhost:3000/',
        // 部署在vercel上的接口需要额外添加一个参数realIP
        baseURL: 'https://xx-music-api.vercel.app',
        params: { realIP: '182.139.156.200' },
        timeout: 10000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    return instance(config)
}
