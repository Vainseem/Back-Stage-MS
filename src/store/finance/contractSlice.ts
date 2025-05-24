import {createSlice} from "@reduxjs/toolkit";
const contractSlice = createSlice({
    name:'contract',
    initialState:{
        data:[],
        total:0,
        current:1,
        size:10,
        formList:{}
    },
    reducers:{
        setData(state,action){
            state.data=action.payload;
        },
        setTotal(state,action){
            state.total=action.payload;
        },
        setCurrent(state,action){
            state.current=action.payload;
        },
        setSize(state,action){
            state.size=action.payload;
        },
        setFormList(state,action){
            state.formList=action.payload;
        }
    }
})

export const {setData,setTotal,setCurrent,setSize,setFormList,} = contractSlice.actions;
export default contractSlice.reducer;
