import { useState } from "react";
import { baseURL } from "../utils/api";



const useGetZone = () => {
    const [zones, setZones] = useState([]);

  const getZone = async() => {
   
    try {
      const {data} = await baseURL.get(
        '/zones',
        {
          headers: {
            Accept: 'application/json',
            APP_KEY: import.meta.env.VITE_APP_KEY,
            Authorization: 'Bearer '+ '11|XEuylT7f9VMUXaJCXLriKjNsXrzp0t2jVegSfqXLbe552bb7'  //localStorage.getItem("userToken")
          },
        }
      );
      setZones(data?.data);

    } catch (error) {
      console.log(error); 
    }
   
  };
  return [getZone,zones]
}

export default useGetZone