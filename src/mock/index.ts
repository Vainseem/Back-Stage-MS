import Mock from 'mockjs'
import RoomPic from '../assets/roomPic.jpg'
Mock.setup({
    timeout:'20-60'
})
Mock.mock("https://www.demo.com/login","post",(options:any)=>{
    const {username,password} = JSON.parse(options.body )
    if (username === 'admin' && password === 'admin123'){
        return {
            code:200,
            message:"登陆成功",
            data:{
                username:"admin",
                token:"MockTokenAdmin123",
                btnAuth:['add','edit','delete']
            }
        }
    }else if (username === 'manager' && password === 'manager123'){
        return {
            code:200,
            message:"登陆成功",
            data:{
                username:"manager",
                token:"MockTokenManager123",
                btnAuth:['add','edit']
            }
        }
    }else if (username === 'user' && password === 'user123'){
        return {
            code:200,
            message:"登陆成功",
            data:{
                username:"user",
                token:"MockTokenUser123",
                btnAuth:['add']
            }
        }
    }else{
        return {
            code:401,
            message:"账号或密码错误",
            data:null
        }
    }

})

//菜单接口
Mock.mock('https://www.demo.com/menu', "get", (options: any) => {
    const token = sessionStorage.getItem("token");
    if (token == "MockTokenAdmin123") {
        return {
            code: 200,
            message: '请求成功',
            data: menuList,

        }
    } else if (token == "MockTokenUser123") {
        return {
            code: 200,
            message: '请求成功',
            data: userMenuList,

        }
    } else if (token == "MockTokenManager123") {
        return {
            code: 200,
            message: '请求成功',
            data: managerMenuList,

        }
    } else {
        return {
            code: 200,
            message: "失败",
            data: []
        }
    }
})
//dashboard里 图表接口

Mock.mock('https://www.demo.com/energyData',"get",()=>{
    return {
        code:200,
        message:"请求成功",
        data:[
            {name:"煤",data:[120, 132, 101, 134, 90, 230, 210]},
            {name:"气",data:[220, 182, 191, 234, 290, 330, 310]},
            {name:"油",data: [150, 232, 201, 154, 190, 330, 410]},
            {name:"电",data:[320, 332, 301, 334, 390, 330, 320]},
            {name:"热",data:[820, 932, 901, 934, 1290, 1330, 1320]}
        ]
    }
})

Mock.Random.extend({
    phone: function () {
        var phonePrefixs = ['13','14','15','16','17','18','19'] // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{9}/) //Number()
    }
})

//租户列表的接口
Mock.mock("https://www.demo.com/userList","post",(options:any)=>{
    const {pageSize,page,companyName,contact,phone}=JSON.parse(options.body)
    return {
        code:200,
        message:"成功",
        data:Mock.mock({
            [`list|${pageSize}`]:[
                {
                    "id":"@string('number',6)",//随机生成一个六位数字id
                    "name":"@cname",//随机生成一个人名
                    "status|1":["1","2","3"],
                    "tel":'@phone',
                    "business|1": ['制造业','互联网','新媒体','美业','新能源','物流','电商'],
                    "email":"@email",
                    "creditCode":"@string('number',18)",
                    "industryNum":"@string('number',15)",
                    "organizationCode":"@string('upper',9)",
                    "legalPerson":"@cname",
                },
            ],
            total:78
        })
    }
})

//删除企业
Mock.mock('https://www.demo.com/deleteUser','post',(options:any)=>{
    const {id}=JSON.parse(options.body);
    console.log("删除企业",id);
    return {
        code: 200,
        message: "成功",
        data:"操作成功"
    }
})

//批量删除企业
Mock.mock('https://www.demo.com/batchDeleteUser','post',(options:any)=>{
    const {ids}=JSON.parse(options.body);
    console.log("ids",ids)
    return {
        code: 200,
        message: "成功",
        data:"操作成功"
    }
})
//编辑企业
Mock.mock('https://www.demo.com/editUser','post',(options:any)=>{
    console.log("编辑企业收到参数",JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data:"操作成功"
    }
})
//获取房间列表的接口
function generateRooms() {
    const rooms = [];
    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6个房间一层
        const roomNumber = floor * 100 + (101 + (i % 6)); // 计算房间号
        rooms.push({
            roomNumber,
            decorationType: Mock.Random.pick(['毛坯', '精装']),
            area: Mock.Random.integer(70, 300),
            unitPrice: Mock.Random.integer(1, 3),
            src:RoomPic
        });
    }
    return rooms;
}
Mock.mock('https://www.demo.com/roomList', 'post', (options:any) => {
    console.log("收到房间id",JSON.parse(options.body).roomid)
    return {
        code: 200,
        message: "成功",
        data: {
            rooms: generateRooms()
        }
    };
});

//合同管理
Mock.mock('https://www.demo.com/contractList', 'post', (options: any) => {
    const {page,pageSize}=JSON.parse(options.body);
    console.log("后端合同管理接到参数",JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'contractNo':'@string("number", 6)',
                'type|1': ['租赁合同','自定义合同','购买合同'],
                'name|1': ["房屋租赁合同通用模版","车位租赁合同通用模版","商业房产买卖合同"],
                "startDate|1":['2023-01-01','2023-03-05','2023-04-01'],
                "endDate|1":['2024-01-01','2024-03-05','2024-04-01'],
                'jia|1': ['万物科技有限公司','大鱼网络科技','六六信息技术有限公司'],
                'yi': '天明物业有限公司',
                'status|1': ["1","2","3"],
            }],
            "total": 54
        })
        // 生成55条数据
    }
});
//设备管理
Mock.mock('https://www.demo.com/equipmentList', 'post', (options: any) => {
    const {page,pageSize,companyName,contact,phone}=JSON.parse(options.body);
    return {
        code: 200,
        message:'成功',
        data:Mock.mock({
            [`list|${pageSize}`]: [{
                "id|+1":1001,
                "name|1":['智能供水机组','A1栋写字楼供暖设备','园区大门入口闸机','球形摄像头'],
                "no|1":['CP-ONYU-1098','H876-09','CDU-B09-21'],
                "person":'@cname',
                "tel|1":["@phone"],
                "time|1":['20年','15年','10年'],
                "rest":'7年',
                'status|1': ["1","2","3"],
                'last|1':['2023-01-01','2023-03-05',],
                'type|1':['型号1','型号2','型号3'],
                'from|1':['上海科技股份有限公司','武汉能源设备邮箱公司']
            }],
            total:66,
        })
    }
});
//账单管理
Mock.mock('https://www.demo.com/billList', 'post', (options: any) => {
    const {page,pageSize,companyName,contact,phone}=JSON.parse(options.body);
    console.log("后端账单管理接到参数",JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'accountNo':'@string("number", 6)',
                'status|1': ['1','2'],
                'roomNo|1': ["A1幢写字楼-201","B1幢写字楼-402","B2幢写字楼-701","C2幢写字楼-1601"],
                "carNo|1":['B109','C227','C106',"D158"],
                "tel|1":['@phone'],
                'costName1|1': [1278.00,2633.00,3698.00],
                'costName2': '200元/月',
                'costName3|1': ["25800/年","19800/年"],
                'startDate':"2023-01-01",
                'endDate':"2024-01-01",
                'preferential':0.00,
                'money':26000.00,
                'pay|1':["微信","支付宝","现金","银行卡转账"]
            }],
            "total": 54
        })
        // 生成55条数据
    }
});
//账号管理
Mock.mock('https://www.demo.com/accountList', 'post', (options: any) => {
//  const {page,pageSize,companyName,contact,phone}=JSON.parse(options.body);
    console.log("后端账号管理接到参数",options)
    return {
        code: 200,
        message: "成功",
        data: {
            list:[
                {
                    id:1001,accountName:"xuchao",auth:"admin",person:"徐超",tel:"188888888888",department:"总裁办",menu:menuList
                },
                {
                    id:1002,accountName:"user01",auth:"user",person:"王丽丽",tel:"17777777777",department:"网推部",menu:userMenuList
                },
                {
                    id:1003,accountName:"manager01",auth:"manager",person:"刘伟",tel:"16666666666",department:"财务部",menu:managerMenuList
                },
                {
                    id:1004,accountName:"user02",auth:"customize",person:"张安定",tel:"15555555555",department:"企划部",menu:customizeMenuList
                },
                {
                    id:1005,accountName:"laowang",auth:"user",person:"王大大",tel:"14444444444",department:"总裁办",menu:userMenuList
                }

            ],
            total:5
        }
    }
});

const customizeMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",
            },

        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]
const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "财务管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "合同管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "合同详情",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "账单管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article.tsx",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

