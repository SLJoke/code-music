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
            limit: 7
        }
    })
}

export function getHotSongSheet() {
    return request({
        url: '/personalized',
        params: {
            limit: 7
        }
    })
}