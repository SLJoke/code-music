import {request} from "./request"

export function getHomeBanner() {
    return request({
        url: 'banner',
        params: {
            type: 1
        }
    })
}