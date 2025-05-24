import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'

export const exportToExcel = (data:any,header:string[])=>{
    //建立工作表,第一个参数是表格的数据，第二个参数是表头的对应标题
    const workSheet = XLSX.utils.json_to_sheet(
        data,{header}
    )
    //建立一个工作簿
    const workBook = XLSX.utils.book_new()
    //把工作表加到工作簿里面去,把工作簿命名为sheet1
    XLSX.utils.book_append_sheet(workBook,workSheet,'sheet1')
    //转换为二进制数据,以xlsx文件格式保存
    const buf = XLSX.write(workBook,{bookType: 'xlsx',type:'buffer'})
    //自动下载,文件名字为selected-data.xlsx
    saveAs(new Blob([buf],{type:"application/octet-stream"}),'selected-data.xlsx')
}