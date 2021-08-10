import {request} from "./request"

export function getMusicUrl(id) {
    return request({
        url: 'song/url',
        params: {
            id: id
        }
    })
}

export function getMusicDetail(ids) {
    return request({
        url: '/song/detail',
        params: {
            ids: ids
        }
    })
}

export function getMusicLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id: id
        }
    })
}