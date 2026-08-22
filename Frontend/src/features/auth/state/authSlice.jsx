import { createSlice } from "@reduxjs/toolkit";
import { currentLoggedEmployee, loginEmployee } from "./authAction";

const authSlice= createSlice(
    {
        name:"auth",
        initialState:{
            employee:null,
            isLoading:false
        },
        reducers:{
            addEmployee:(state,action)=>{
                state.employee=action.payload
                state.isLoading=false
            },
            reomveEmployee:(state,action)=>{
                state.employee=null
                state.isLoading=false
            }
        },
        extraReducers:(builder)=>{
            builder.addCase(loginEmployee.pending,(state)=>{
                state.isLoading=true

            })
            .addCase(loginEmployee.fulfilled,(state,action)=>{
                state.isLoading=false
                state.employee=action.payload

            })
            .addCase(loginEmployee.rejected,(state)=>{
                state.isLoading=false

            })
            .addCase(currentLoggedEmployee.pending,(state)=>{
                state.isLoading=true

            })
            .addCase(currentLoggedEmployee.fulfilled,(state,action)=>{
                state.isLoading=false
                state.employee=action.payload

            })
            .addCase(currentLoggedEmployee.rejected,(state)=>{
                state.isLoading=false

            })
        }

    }
)

export let {addEmployee,reomveEmployee}=authSlice.actions
export default authSlice.reducer