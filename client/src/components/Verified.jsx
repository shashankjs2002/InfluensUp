import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Verified = () => {
    const navigate = useNavigate(null)
    let [time, setTime] = useState(5)
    useEffect(() => {         
            setInterval(() => {
                if(time===0){
                    navigate('/login')
                }
                else{
                    let newtime = time-1
                    setTime(newtime)
                }
            }, 1000);
     
    }, [time])
  return (
    <>
    <div style={{padding: '80px'}}>

        <h1>Email verified Successfully</h1>
        <h2>Login in continue</h2>
        <h3>Redirecting to login Page in {time}</h3>
    </div>
    </>
  )
}

export default Verified