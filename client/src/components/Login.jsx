import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormContext from '../context/FormContext';


const Login = () => {

    const navigate = useNavigate(null)

    const context = useContext(FormContext)
    const {formName,changeForm, error, setError, host} = context
    const [iCredential, setICredential] = useState({email: "", password : ""})
    const [bCredential, setBCredential] = useState({email: "", password : ""})
    
    const onchange = (e) => {
        formName==='influencer-form' 
        ?
        setICredential({...iCredential, [e.target.name]: e.target.value})
        :
        setBCredential({...bCredential, [e.target.name]: e.target.value})
    }

    const handleInfluencerLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({email: iCredential.email, password: iCredential.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            console.log("success")
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('type', 'influencer');
            navigate('/influencer/dashboard');
        } else{
            console.log(json.error)
            setError(json.error)
            setTimeout(() => {
                setError(null)
            }, 5000);
        }
    }
    
    const handleBrandLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/brand-login`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({email: bCredential.email, password: bCredential.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            console.log("success")
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('type', "brand");
            navigate('/brand/dashboard');
        } else{
            console.log(json.error)
            setError(json.error)
            setTimeout(() => {
                setError(null)
            }, 5000);
        }

    }
  return (
    <>

        <div className="formSec" style={{padding: "80px", margin:"auto"}}>
            <div className="type">
                <h3>
                    <span id='formTitle' className='form-1' onClick={()=>changeForm('influencer-form')}>Influencer</span>
                    <span id='formTitle'  className='form-2' onClick={()=> changeForm('brand-form')}>Brand</span>
                </h3>
            </div>
            {
                formName==='influencer-form' 
                ?
                <form id='influencer-form' onSubmit={handleInfluencerLogin}>
                <div className='my-form'>
                    <div className='ans'>
                        <label htmlFor="email">Email Id <span className='star'>*</span></label>
                        <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={iCredential.email}/>
                    </div>
                    <div className='ans'>
                        <label htmlFor="password">Password <span className='star'>*</span></label>
                        <input type="password" name="password" placeholder='Password'  onChange={onchange} value={iCredential.password}/>
                    </div>
                    <div className="ans">
                        {error}
                    </div>
                    <button type="submit" id='btn'>Login</button>
                </div>
            </form>

            :
            <form id='brand-form'  onSubmit={handleBrandLogin}>
                <div className='my-form'>
                    <div className='ans'>
                        <label htmlFor="email">Email Id <span className='star'>*</span></label>
                        <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={bCredential.email} required/>
                    </div>
                    <div className='ans'>
                        <label htmlFor="password">Password <span className='star'>*</span></label>
                        <input type="password" name="password" placeholder='Password'  onChange={onchange} value={bCredential.password} required/>
                    </div>

                    <div className="ans">
                        {error}
                    </div>

                    <button type="submit" id='btn'>Login</button>

                </div>

            </form>
            }
        </div>
    </>
  )
}

export default Login