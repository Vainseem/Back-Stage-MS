import {Button, Card, Col, Input, Row, Table, Pagination, Tag, Popconfirm,message} from 'antd'
import type {TableProps,PaginationProps} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import type {DataType,SearchType} from "./interface";
import {batchDeleteUser, deleteUser, getUserList} from "../../api/userList";
import UserForm from "./userForm";
import {useDispatch} from "react-redux";
import { setUserData } from "../../store/user/userSlice";

function Users() {
    const columns:TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'index',
            key: 'index',
            render:(value, record, index)=>{
                return index+1
            }
        },
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '经营状态',
            dataIndex: 'status',
            key: 'status',
            render(value,record){
                return (
                    value==='1'?<Tag color='green'>营业中</Tag>:
                        value==='2'?<Tag color='yellow'>暂停营业</Tag>:
                            <Tag color='red'>已关闭</Tag>
                )
            }
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '所属行业',
            dataIndex: 'business',
            key: 'business',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '统一信用代码',
            dataIndex: 'creditCode',
            key: 'creditCode',
        },
        {
            title: '工商注册号',
            dataIndex: 'industryNum',
            key: 'industryNum',
        },
        {
            title: '组织结构代码',
            dataIndex: 'organizationCode',
            key: 'organizationCode',
        },
        {
            title: '法人名',
            dataIndex: 'legalPerson',
            key: 'legalPerson',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render:(value, record, index)=>{
                return <>
                    <Button type='primary' className='mr' size='small' onClick={()=>edit(record)}>编辑</Button>
                    <Popconfirm title='删除' description='确定要删除？' okText='是' cancelText='否' onConfirm={()=>confirmDelete(record.id)}>
                        <Button type='primary' danger size='small'>删除</Button>
                    </Popconfirm>
                </>
            }
        },
    ]
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [dataList,setDataList] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedRowKeys,setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [isModalVisible,setIsModalVisible] = useState<boolean>(false);
    const [ModalTitle,setModalTitle] = useState<string>('');
    const [formData, setFormData] = useState<SearchType>({
        companyName:'',
        contact:'',
        phone:'',
    })
    useEffect(()=>{
        loadData()
    },[page,pageSize])
    const edit = (record:DataType)=>{
        setIsModalVisible(true);
        setModalTitle('编辑企业')
        dispatch(setUserData(record))
    }
    const add = ()=>{
        setIsModalVisible(true);
        setModalTitle('新增企业')
        dispatch(setUserData({}))
    }
    const hideModal = useCallback(()=>{//将这个函数缓存，使得子组件UserForm不会重复更新
        setIsModalVisible(false);
    },[])
    const disabled = useMemo(()=>{ //类似于computed计算属性
        return !selectedRowKeys.length;
    },[selectedRowKeys])
    const onSelectedChange = (selectedRowKeys:React.Key[])=>{
        setSelectedRowKeys(selectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange:onSelectedChange
    }
    const loadData = async () => {
        setLoading(true);
        const {data:{list,total}} = await getUserList({...formData,page,pageSize})
        setDataList(list)
        setTotal(total)
        setLoading(false);
    }
    const reset = ()=>{
        setSelectedRowKeys([])
        setFormData({companyName:'',contact:'',phone:'',})
        setPage(1)
        setPageSize(10)
        loadData()
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }
    const onChange:PaginationProps['onChange'] = (page,pageSize)=>{
        setPage(page)
        setPageSize(pageSize)
    }
    const confirmDelete = (id:string)=>{
        deleteUser(id)
        messageApi.open({
            type: 'success',
            content: '删除成功',
        });
    }
    const batchDelete =  ()=>{
        batchDeleteUser(selectedRowKeys)
    }
    return <div className='users'>
        {contextHolder}
        <MyUserForm title={ModalTitle} isModalVisible={isModalVisible} hideModal={hideModal} loadData={loadData}></MyUserForm>
        <Card className='search'>
            <Row gutter={16}>
                <Col span={7}>
                    <p>企业名称：</p>
                    <Input value={formData.companyName} onChange={handleChange}></Input>
                </Col>
                <Col span={7}>
                    <p>联系人：</p>
                    <Input value={formData.contact} onChange={handleChange}></Input>
                </Col>
                <Col span={7}>
                    <p>联系电话：</p>
                    <Input value={formData.phone} onChange={handleChange}></Input>
                </Col>
                <Col span={3}>
                    <Button type='primary' className='mr' onClick={loadData}>搜索</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className='mt tr'>
            <Button type='primary' className='mr' onClick={add}>新增企业</Button>
            <Button type='primary' danger disabled={disabled} onClick={batchDelete}>批量删除</Button>
        </Card>
        <Card className='mt'>
            <Table
                columns={columns}
                dataSource={dataList}
                rowKey={record => record.id}
                loading={loading}
                rowSelection={rowSelection}
                pagination={false}
            />
            <Pagination
                className="fr mt"
                total={total}
                current={page}
                pageSize={pageSize}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条数据`}
                onChange={onChange}
            />
        </Card>
    </div>
}

const MyUserForm = React.memo(UserForm)

export default Users;