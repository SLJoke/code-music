import {request} from "./request";

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