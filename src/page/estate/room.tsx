import {getRoomList} from "../../api/room";
import {Card, Col, Row, Image, Radio, RadioChangeEvent, Spin} from "antd";
import './index.scss'
import {useEffect, useState} from "react";


interface RoomType {
    roomNumber: number;
    decorationType: "毛坯"|"精装";
    unitPrice: number;
    area: number;
    src:string;
}

function Room() {
    const [visible, setVisible] = useState<boolean>(false);
    const [room,setRoom] = useState<RoomType[]>([])
    const [src,setSrc] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    const loadRoom = async (roomId:string) => {
        setLoading(true);
        const {data:{rooms}} = await getRoomList(roomId)
        setRoom(rooms)
        setLoading(false);
    }
    const showImage = (src:string)=>{
        setVisible(true);
        setSrc(src)
    }
    const handleChange = (e:RadioChangeEvent)=>{
        const roomid:string = e.target.value
        loadRoom(roomid)
    }
    useEffect(() => {
        loadRoom('a1')
    },[])
    return <div className="room">
        <Image
            width={200}
            style={{display:'none'}}
            preview={{
                visible,
                src,
                onVisibleChange: (value:boolean)=>{
                    setVisible(value)
                }
            }}
        />
        <Card className="mb">
            <Radio.Group defaultValue="a1"  optionType="button"  buttonStyle="solid" onChange={handleChange}>
                <Radio.Button value="a1">A1幢写字楼</Radio.Button>
                <Radio.Button value="a2">A2幢写字楼</Radio.Button>
                <Radio.Button value="b1">B1幢写字楼</Radio.Button>
                <Radio.Button value="b2">B2幢写字楼</Radio.Button>
                <Radio.Button value="c1">C1幢写字楼</Radio.Button>
                <Radio.Button value="c2">C2幢写字楼</Radio.Button>
                <Radio.Button value="d1">天汇国际大厦A座</Radio.Button>
                <Radio.Button value="d2">时代金融广场</Radio.Button>
            </Radio.Group>
        </Card>
        <Spin spinning={loading}>
            <Row gutter={16}>
                {room.map((item)=>{
                    return (<>
                        <Col className='item' span={6}>
                            <Card title='房间号' extra={<a onClick={()=>showImage(item.src)}>户型图</a>}>
                                <h1>{item.roomNumber}</h1>
                                <div className='clearfix mt'>
                                    <p className='fl'>装修情况</p>
                                    <p className='fr'>{item.decorationType}</p>
                                </div>
                                <div className='clearfix mt'>
                                    <p className='fl'>房间面积</p>
                                    <p className='fr'>{item.area}㎡</p>
                                </div>
                                <div className='clearfix mt'>
                                    <p className='fl'>出租单价</p>
                                    <p className='fr'>{item.unitPrice}元/㎡</p>
                                </div>
                            </Card>
                        </Col>
                    </>)
                })}
            </Row>
        </Spin>
    </div>
}

export default Room;