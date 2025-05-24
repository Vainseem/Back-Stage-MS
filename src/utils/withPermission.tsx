function withPermission(requiredPermission:string[],userPermission:string[]):(component:React.FC)=>React.FC {
    return function (Component:React.FC){
        return function (props:any):React.ReactElement|null{
            const hasPermission:boolean=requiredPermission.every(item=>userPermission.includes(item));
            if(hasPermission){
                return <Component {...props}></Component>
            }
            return null
        }
    }
}

export default withPermission;