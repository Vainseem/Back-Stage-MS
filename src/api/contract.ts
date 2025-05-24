import {post} from "../utils/http/request";
import {data} from "react-router-dom";

interface SearchData{
    contractNo:string;
    person:string;
    tel:string;
    page:number;
    pageSize:number;
}

interface BillTyoe{
    page:number;
    pageSize:number;
    no:string;
    status:string;
    startDate:string;
    endDate:string;
}

export function getContractList (data:SearchData) {
    return post("/contractList",data);
}

export function getBillList(data:BillTyoe){
    return post('/billList',data);
}