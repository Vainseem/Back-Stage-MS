## 一款智慧园区的React项目

### 技术栈

- React 18 & 19
- Mockjs模拟后端
- Ant Design设计UI
- redux/toolkit (RTK)
- TypeScript
- Sass
- xlsx（将表格导出为Excel文件）
- webpack

### 项目优化

- redux和localStorage结合存储部分常用性数据（如token）以节约性能消耗。
- 根据用户的身份权限不同，后端分发对应的路由表动态生成路由，防止用户跳过权限管理直接访问路由：从后端获取到对应人员权限的路由路径，如'/user'，得到相应的路径后通过对照表递归（递归是因为如果路由下有子集的时候需要继续生成路由）生成route再交给App.tsx去渲染路由。
- 对重复的组件内容进行封装：如项目中多处使用Table表格的搜索、分页、加载等事件，将其封装为一个独立组件，提高代码复用率。
- 根据权限动态分配组件的显示与隐藏：如“删除用户”的按钮组件，在admin身份下可以进行查看并操作，在user身份下即会发生隐藏。
- 路由响应拦截器和请求拦截器的设置简化后续有关请求数据处理部分的代码。
- 支持Table表格的内容导出Excel文件。

### 项目演示
项目拥有三个身份可供体验
- 普通用户：
  账号：user
  密码：user123
- 经理：
  账号：manager
  密码：manager123
- 管理员：
  账号：admin
  密码：admin123
![image](https://github.com/user-attachments/assets/2afef177-184c-4781-accf-096a1ce1b638)
![image](https://github.com/user-attachments/assets/4ccb8d37-d79d-4c55-b719-61e6b6325ae9)
![image](https://github.com/user-attachments/assets/78632dde-e83d-4cb6-8396-521c51ada85b)
![image](https://github.com/user-attachments/assets/2a8ad1be-d067-4861-830a-23667329462a)
![image](https://github.com/user-attachments/assets/3c990a34-363e-40c4-8dd5-2d898f0f755a)
![image](https://github.com/user-attachments/assets/b986a9f6-ec23-4ed2-ad9d-54821aad0428)
![image](https://github.com/user-attachments/assets/71aecc58-f28c-491c-8bf6-2e7026a8736b)
![image](https://github.com/user-attachments/assets/ed1d3754-a33d-42be-8117-1a0830563d4d)






