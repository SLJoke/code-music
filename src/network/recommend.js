import {request} from "./request"

export function getHomeBanner() {
    return request({
        url: 'banner',
        params: {
            type: 1
        }
    })
}

export function getHotMusic() {
    return request({
        url: '/personalized/newsong',
        params: {
            limit: 10
        }
    })
}