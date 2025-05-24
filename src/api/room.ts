import {post} from "../utils/http/request";
export function getRoomList(roomId: string) {
    return post('/roomList',{roomId});
}