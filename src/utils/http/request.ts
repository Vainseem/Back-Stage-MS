import http from './http'
interface ApiResponse {
    code:number,
    message:string,
    data:any
}
// aixos.get('/data.json',{
//     params:{
//         id:1234
//     }
// })
export function  get(url:string,params?:any):Promise<ApiResponse>{
    return http.get(url,{params})//注意axios的get语法，与POST不太一样,需要一个属性名叫做params
}
// axios.post('/data.json',{
//     id:1234
// })
export function  post(url:string,data?:any):Promise<ApiResponse>{
    return http.post(url,data)//这里的post语法，第二个参数直接传入对象
}