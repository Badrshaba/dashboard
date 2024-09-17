import { useState } from "react";
import { getUsersApi } from "../utils/api";



const useGetZone = () => {
    const [zones, setZones] = useState([]);

  const getZone = async() => {
   
    try {
      const {data} = await getUsersApi.get('/zones');
      setZones(data?.data);
    } catch (error) {
      console.log(error); 
    }
   
  };

  return [getZone,zones]
}

export default useGetZone