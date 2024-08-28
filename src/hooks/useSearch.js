import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../utils/api";


const useSearch = (endPoint,funUpdate) => {
    const [search, setSearch] = useState("");
  const dispatch = useDispatch()
  const searchHandel = async(e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        endPoint,
        {
          key:search,
        },
        {
          headers: {
            Accept: 'application/json',
            APP_KEY: import.meta.env.VITE_APP_KEY,
            Authorization: 'Bearer '+ '11|XEuylT7f9VMUXaJCXLriKjNsXrzp0t2jVegSfqXLbe552bb7'  //localStorage.getItem("userToken")
          },
        }
      );
      if (res.status === 200) {
        dispatch(funUpdate(res.data.data))
      }
    } catch (error) {
      console.log(error); 
    }
   
  };
  return [searchHandel,search,setSearch]
}

export default useSearch