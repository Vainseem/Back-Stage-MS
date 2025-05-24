## 一款智慧园区的React项目

### 技术栈

- React 18 & 19
- Mockjs模拟后端
- Ant Design设计UI
- redux/toolkit (RTK)
- TypeScript
- Sass

优化：

- redux和localStorage结合存储数据以节约性能消耗
- 根据用户的身份权限不同，动态生成路由，防止用户跳过权限管理直接访问路由：从后端获取到对应人员权限的路由路径，如'/user'，得到相应的路径后通过对照表递归（递归是因为如果路由下有子集的时候需要继续生成路由）生成route再交给App.tsx去渲染路由



