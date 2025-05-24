import {RouteObject} from "react-router-dom";
import {componentMap} from "../router/rouetMap";

interface MenuType{
    icon:string;
    key:string;
    label:string;
    children?:MenuType[];
}
export const generateRoutes = (menu:MenuType[]):RouteObject[] => {
    return menu.map((item:MenuType)=>{
        const hasChildren = item.children
        let routerObj:RouteObject = {
            path:item.key,
            element:hasChildren ? null : <>{componentMap[item.key]}</>,
        }
        if (item.children){
            routerObj.children = generateRoutes(item.children);
        }
        return routerObj;
    })
}