import {request} from "./request"

export function getPlayListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}