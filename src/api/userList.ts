import {post} from "../utils/http/request";
import React from "react";
interface SearchType {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    tel?: string;
}
export function getUserList(data: SearchType){
    return post("/userList",data);
}
export function deleteUser(id: string){
    return post("/deleteUser", {id});
}
export function batchDeleteUser(ids: React.Key[]){
    return post("/batchDeleteUser", {ids});
}
export function editUser(record:any){
    return post("/editUser", record);
}