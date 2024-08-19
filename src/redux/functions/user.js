import axios from "axios"

export const login=async ({})=>{
    const {data}=await axios.post('',{},{
        withCredentials:true,
    })
    console.log(data)
}