import axios from 'axios';
import { useEffect, useState } from 'react';

const useCheckConnection = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const checkResponse=async()=>{
    try {
     const req= await fetch('https://www.google.com',{
       method:"HEAD",
       mode:'no-cors'
     })
     setIsOnline(true)
    //console.log(req)
    } catch (error) {
     setIsOnline(false)
     //console.log(error)
     
    }
  }
  const doubleCheck=()=>{
    if(navigator.onLine){
      checkResponse()
    }else{
      setIsOnline(false)
    }
  }

  useEffect(() => {
    checkResponse()
    
     
    window.addEventListener('online', doubleCheck);
    window.addEventListener('offline', doubleCheck);

    return () => {
      
      window.removeEventListener('online', doubleCheck);
      window.removeEventListener('offline', doubleCheck);
    };
  }, []);

  return isOnline;
};

export default useCheckConnection;
