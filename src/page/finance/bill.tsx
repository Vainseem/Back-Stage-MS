import {Card,Row,Col,Input,Table,Pagination,Statistic,DatePicker,Select,Button, Tag} from "antd"
import {DownloadOutlined,DeleteOutlined} from '@ant-design/icons';
import { TableProps } from "antd";
import {getBillList} from "../../api/contract";
import React, {useEffect, useMemo, useState} from "react";
import {exportToExcel} from "../../utils/exportToExcel";
import {log} from "node:util";

const {RangePicker}=DatePicker

interface DataType{
    key?:string;
    accountNo:string;
    status?:string;
    roomNo?:string;
    carNo?:string;
    tel?:string;
    costName1?:string;
    costName2?:string;
    costName3?:string;
    startDate?:string;
    endDate?:string;
    preferential?:number;
    money?:number;
    pay?:string;

}
interface SearchType{
    date:string[];
    no:string;
    status:string;
    page:number;
    pageSize:number
}

function Bill() {
    const header = ["accountNo","status" ,'roomNo', 'carNo', 'tel', 'costName1', 'costName2', 'costName3', 'startDate', 'endDate', 'preferential', 'money', 'pay']
    const [formData, setFormData] = useState<SearchType>({
        date:[],
        no:'',
        status:'',
        page:1,
        pageSize:10,
    })

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "No.",
            key: "index",
            render(value, record, index) {
                return index + 1
            },
            width: 100,
            fixed: "left"
        },
        {
            title: "账单号",
            dataIndex: "accountNo",
            key: "accountNo",
            width: 150,
        },
        {
            title: "缴费状态",
            dataIndex: "status",
            key: "status",
            width: 100,
            render(value) {
                return value == 1 ? <Tag color="green">已缴费</Tag> : <Tag color="red">未缴费</Tag>
            }
        },
        {
            title: "房屋号",
            dataIndex: "roomNo",
            key: "roomNo",
            width: 100,
        },
        {
            title: "车位号",
            dataIndex: "carNo",
            key: "carNo",
            width: 100,
        },
        {
            title: "手机号",
            dataIndex: "tel",
            key: "tel",
            width: 150,
        },
        {
            title: "物业费(年)",
            dataIndex: "costName1",
            key: "costName1",
            width: 150,
        },

        {
            title: "车位费",
            dataIndex: "costName2",
            key: "costName2",
            width: 150,
        },
        {
            title: "房屋租金",
            dataIndex: "costName3",
            key: "costName3",
            width: 150,
        },

        {
            title: "开始时间",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
        },
        {
            title: "结束时间",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
        },
        {
            title: "优惠金额",
            dataIndex: "preferential",
            key: "preferential",
            width: 150,
        },
        {
            title: "合计应收金额",
            dataIndex: "money",
            key: "money",
            width: 150,
        },
        {
            title: "支付方式",
            dataIndex: "pay",
            key: "pay",
            width: 100,
        },
        {
            title: "操作",
            width: 230,
            key: "operate",
            fixed: "right",
            render(value:any,record:DataType) {
                return <>
                    <Button type="primary" size="small" onClick={()=>exportToExcel([record],header)}>打印</Button>
                    <Button type="primary" size="small" danger className="ml mr">账单作废</Button>
                    <Button type="primary" size="small">退款</Button>
                </>
            }
        }
    ]
    const [dataList, setDataList] = useState<DataType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading,setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [selectedRowKeys,setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRow,setSelectedRow] = useState<any>({});
    const onselectChange = (selectedRowKeys:React.Key[],selectedRows:any)=>{
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRow(selectedRows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange:onselectChange,

    }

    const handleChange = (value:any,dateString:any)=>{
        setFormData(prevState => ({
            ...prevState,
            date:dateString,
        }))
    }

    const handleChange1 = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prevState => ({
            ...prevState,
            no:e.target.value,
        }))
    }

    const handleChange2 = (value:string)=>{
        setFormData(prevState => ({
            ...prevState,
            status:value,
        }))
    }

    const onChange = (page:number,pageSize:number) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const loadData = async () => {
        setLoading(true);
        const {data:{list,total}} = await getBillList({page,pageSize,startDate:formData.date[0],endDate:formData.date[1],no:formData.no,status:formData.status})
        setDataList(list)
        setTotal(total)
        setLoading(false);
    }

    const disabled = useMemo(()=>{
        return !selectedRowKeys.length; //selectedRowKeys.length ? false : true   的简化
    },[selectedRowKeys])



    useEffect(() => {
        loadData()
    },[page,pageSize])

    return <div>
        <Card >
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="应收账单金额" value="16,876.38"/>
                </Col>
                <Col span={6}>
                    <Statistic title="已缴账单金额" value="6,952.00"/>
                </Col>
                <Col span={6}>
                    <Statistic title="已退账单金额" value="2,355.23"/>
                </Col>
                <Col span={6}>
                    <Statistic title="未缴账单金额" value="9,962.00"/>
                </Col>
            </Row>
        </Card>
        <Card className="mt search">
            <Row gutter={16}>
                <Col span={6}>
                    <p>账单日期</p>
                    <RangePicker name="date" style={{width:"100%"}} onChange={handleChange}/>
                </Col>
                <Col span={6}>
                    <p>房/车号：</p>
                    <Input placeholder="请输入门牌号或者车位号" onChange={handleChange1}/>
                </Col>
                <Col span={6}>
                    <p>缴费情况</p>
                    <Select
                        style={{width:"100%"}}
                        options={[
                            {value:"1",label:"全部"},
                            {value:"2",label:"已缴纳"},
                            {value:"3",label:"未缴纳"}
                        ]}
                        onChange={handleChange2}
                    ></Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" className="mr" onClick={loadData}>查询</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Button type="primary" icon={<DownloadOutlined />} disabled={disabled} onClick={()=>exportToExcel(selectedRow,header)}>批量导出为Excel</Button>
            <Button icon={<DeleteOutlined/>} danger className="ml" type="primary" disabled={disabled}>批量作废</Button>
        </Card>
        <Card className="mt">
            <Table
                dataSource={dataList}
                columns={columns}
                pagination={false}
                rowKey={(record)=>record.accountNo}
                scroll={{x:1200}}
                rowSelection={rowSelection}
                loading={loading}
            />
            <Pagination className="fr mt" showQuickJumper current={page} total={total} pageSize={pageSize} onChange={onChange}/>
        </Card>
    </div>
}
export default Bill;