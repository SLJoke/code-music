import {request} from "./request"

export function search(keywords) {
    return request({
        url: 'cloudsearch',
        params: {
            keywords: keywords
        }
    })
}