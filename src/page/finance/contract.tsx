import {Button, Card, Col, Input, Pagination, PaginationProps, Row, Table, TableProps, Tag} from "antd";
import {useEffect, useState} from "react";
import {getContractList} from "../../api/contract";
import {useDispatch, useSelector} from "react-redux";
import {setData, setTotal,setSize,setCurrent,setFormList} from "../../store/finance/contractSlice";
import {useNavigate, useSearchParams} from "react-router-dom";

interface FormData {
    contractNo: string;
    person:string;
    tel: string;
}
interface DataType{
    key:string;
    contractNo:string;
    type:string;
    name:string;
    startDate:string;
    endDate:string;
    jia:string;
    yi:string;
    status:string
}
function Contract() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {formList,current,size} = useSelector((state:any)=>state.contractSlice)
    const [searchParams] = useSearchParams()
    const {data,total} = useSelector((state:any) => state.contractSlice)
    const [formData, setFormData] = useState<FormData>({
        contractNo:'',
        person:'',
        tel:''
    })
    const [loading,setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const isReturn = searchParams.get("return") //拿到路由参数，判断是否是从合同详情页面返回，来实现数据缓存
    const loadData = async (page:number,pageSize:number) => {
        setLoading(true);
        const {data:{list,total}} = await getContractList({...formData, page, pageSize});
        dispatch(setData(list))
        dispatch(setTotal(total))
        setLoading(false);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        dispatch(setFormList({
            ...formData,
            [name]:value
        }))
    }

    const onChange:PaginationProps['onChange'] = (page,pageSize) => {
        setPage(page)
        setPageSize(pageSize)
        dispatch(setCurrent(page))
        dispatch(setSize(pageSize))
        loadData(page,pageSize);
    }

    const detail = (contractNo:string)=>{
        navigate('/finance/surrender?contractNo=' + contractNo)
    }

    const reset = ()=>{
        setFormData({
            contractNo:'',
            person:'',
            tel:''
        })
        setPage(1)
        setPageSize(10)
        loadData(1,10)
    }

    useEffect(() => {
        if (!isReturn || !data.length) {
            loadData(page,pageSize)
        }
        if (isReturn) {
            setFormData(formList)
            setPage(current)
            setPageSize(size)
        }
    },[])

    const columns:TableProps<DataType>['columns'] = [
        {
            title:"No.",
            key:"index",
            render(value,record,index){
                return index+1
            }
        },
        {
            title:"合同编号",
            dataIndex:"contractNo",
            key:"contractNo"
        },
        {
            title:"合同类别",
            dataIndex:"type",
            key:"type"
        },
        {
            title:"合同名称",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"合同开始日期",
            dataIndex:"startDate",
            key:"startDate"
        },
        {
            title:"合同结束如期",
            dataIndex:"endDate",
            key:"endDate"
        },
        {
            title:"甲方",
            dataIndex:"jia",
            key:"jia"
        },
        {
            title:"乙方",
            dataIndex:"yi",
            key:"yi"
        },
        {
            title:'审批状态',
            dataIndex:"status",
            key:"status",
            render(value:any){
                return value==1 ?  <Tag>未审批</Tag> :
                        value==2 ?  <Tag color='green'>审批通过</Tag> :
                        <Tag color='red'>审批拒绝</Tag>
            }
        },
        {
            title:'操作',
            key:'operate',
            render(value,record){
                return <Button type="primary" size='small' onClick={()=>detail(record.contractNo)}>合同详情</Button>
            }
        }
    ]

    return <>
        <Card className='search'>
            <Row gutter={16}>
                <Col span={7}>
                    <p>合同编号：</p>
                    <Input name='contractNo' value={formData.contractNo} onChange={handleChange}/>
                </Col>
                <Col span={7}>
                    <p>联系人：</p>
                    <Input name='person' value={formData.person} onChange={handleChange}/>
                </Col>
                <Col span={7}>
                    <p>联系电话：</p>
                    <Input name='tel' value={formData.tel} onChange={handleChange}/>
                </Col>
                <Col span={3}>
                    <Button type='primary' className='mr' onClick={()=>loadData(page,pageSize)}>查询</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className='mt'>
            <Table
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={data}
                rowKey={record => record.contractNo}
            />
            <Pagination
                className='mt fr'
                defaultCurrent={1}
                showQuickJumper={true}
                total={total}
                current={page}
                pageSize={pageSize}
                onChange={onChange}
            />
        </Card>
    </>
}

export default Contract;