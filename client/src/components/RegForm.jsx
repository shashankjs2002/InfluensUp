import React, {useContext, useRef, useState} from 'react'
import './styles/RegForm.css'
import formImg from '../assets/form.png'
import FormContext from '../context/FormContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RegForm = () => { 
    const context = useContext(FormContext)
    const {formName,changeForm, error, setError, host} = context
    const [iCredential, setICredential] = useState({name: "", email: "", password : "", cpassword: "",  contactNumber: "", ytlink: "", iglink: "", category: "", message: ""})
    const [bCredential, setBCredential] = useState({name: "", email: "", password : "", cpassword: "",  contactNumber: "", website: "", category: "", message: ""})
    let navigate = useNavigate();
    const [icpass, seticpass] = useState(null)
    const [bcpass, setbcpass] = useState(null)
    let [passwordErr, setPasswordErr] = useState(false)
    
    useEffect(() => {
        formName==='influencer-form' 
        ?
        (iCredential.password !== iCredential.cpassword) ? seticpass({backgroundColor : '#ff0a0a3d'}) : seticpass({backgroundColor : 'white'})       
        :
        (bCredential.password !== bCredential.cpassword) ? setbcpass({backgroundColor : '#ff0a0a3d'}) : setbcpass({backgroundColor : 'white'})       

    }, [iCredential.cpassword, iCredential.password, bCredential.password, bCredential.cpassword ])

    const onchange = (e) => {
        formName==='influencer-form' 
        ?
        setICredential({...iCredential, [e.target.name]: e.target.value})
        :
        setBCredential({...bCredential, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
             if (iCredential.password === iCredential.cpassword){
                // console.log(iCredential.email+ " " + iCredential.password);
                const response = await fetch(`${host}/api/auth/create-influencer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({name: iCredential.name,email: iCredential.email, password: iCredential.password, contactNumber: iCredential.contactNumber, ytlink: iCredential.ytlink, iglink: iCredential.iglink, category: iCredential.category, message: iCredential.message})
                });
                const json = await response.json();
                console.log(json)
                if(json.success){
                    console.log("success")
                    // localStorage.setItem('token', json.authToken);
                    navigate('/onsubmit');
                } else{
                    console.log("error")
                    setError(json.error)
                    setTimeout(() => {
                        setError(null)
                    }, 5000);
                }
            }
            else {
                console.log("Password not match")
                setPasswordErr = true;
                setTimeout(() => {
                    setPasswordErr =false;
                }, 5000);
            }
    }

    const handleBrandSubmit = async (e) => {
        e.preventDefault();
             if (bCredential.password === bCredential.cpassword){
                const response = await fetch(`${host}/api/auth/create-brand`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({name: bCredential.name,email: bCredential.email, password: bCredential.password, contactNumber: bCredential.contactNumber, website: bCredential.website,  category: bCredential.category, message: bCredential.message})
                });
                const json = await response.json();
                console.log(json)
                if(json.success){
                    console.log("success")
                    // localStorage.setItem('token', json.authToken);
                    navigate('/onsubmit');
                } else{
                    console.log("error")
                    setError(json.error)
                    setTimeout(() => {
                        setError(null)
                    }, 5000);
                }
            }
            else {
                console.log("Password not match")
                setPasswordErr = true;
                setTimeout(() => {
                    setPasswordErr =false;
                }, 5000);
            }
    }
        
    return (
        <>
            <div id='reg' className="regForm">
                <div className="homeContent">
                    <div className="left">
                        <h1>Get in touch</h1>
                        <img id='formImg' src={formImg} alt="" />
                    </div>
                    <div className="formSec">
                        <div className="type">
                            <h3>
                                <span id='formTitle' className='form-1' onClick={()=>changeForm('influencer-form')}>Influencer</span>
                                <span id='formTitle'  className='form-2' onClick={()=> changeForm('brand-form')}>Brand</span>
                            </h3>
                        </div>
                        {
                            formName==='influencer-form' 
                            ?
                            <form id='influencer-form' onSubmit={handleSubmit}>
                            <div className='my-form'>
                                <div className='ans'>
                                    <label htmlFor="name">Name <span className='star'>*</span></label>
                                    <input type="text" name="name" placeholder='Name'  onChange={onchange} value={iCredential.name} required/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="email">Email Id <span className='star'>*</span></label>
                                    <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={iCredential.email}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="password">Password <span className='star'>*</span></label>
                                    <input type="password" name="password" placeholder='Password'  onChange={onchange} value={iCredential.password}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="cpassword">Confirm Password <span className='star'>*</span></label>
                                    <input type="password" name="cpassword" style={icpass} id="cpass" placeholder='Confirm Password'  onChange={onchange} value={iCredential.cpassword}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <input type="number" name="contactNumber" placeholder='Contact Number'  onChange={onchange} value={iCredential.contactNumber}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="ytLink">Youtube Channel Link</label>
                                    <input type="url" name="ytlink" placeholder='Youtube Channel Link'  onChange={onchange} value={iCredential.ytlink}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="igLink">Instagram Link</label>
                                    <input type="url" name="iglink" placeholder='Instagram Link'  onChange={onchange} value={iCredential.iglink}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="category">Category</label>
                                    <select name="category" onChange={onchange} value={iCredential.category}>
                                        <option value="None">Select</option>
                                        <option value="Beauty">Beauty and Fashion</option>
                                        <option value="Health and Fitness">Health and Fitness</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Anime Information">Anime Information </option>
                                        <option value="Travel">Travel</option>
                                        <option value="Vlogs">Vlogs</option>
                                        <option value="Enterntainment">Entertainment</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Education">Education</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Motivation">Motivation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {/* <input type="" name="iglink" id="" placeholder='Message' /> */}
                                </div>
                                <div className='ans'>
                                    <label htmlFor="msg">Message</label>
                                    <input type="text" name="message" placeholder='Message'  onChange={onchange} value={iCredential.message}/>
                                </div>

                                {/* {
                                    passwordError ? <div>Password and Confirm Password not match</div> : ''
                                } */}
                                <div className="ans">
                                    {error}
                                </div>
                                <button type="submit" id='btn'>Submit</button>
                            </div>
                        </form>

                        :
                        <form id='brand-form'  onSubmit={handleBrandSubmit}>
                            <div className='my-form'>
                                <div className='ans'>
                                    <label htmlFor="name">Brand Name <span className='star'>*</span></label>
                                    <input type="text" name="name" placeholder='Brand Name'  onChange={onchange} value={bCredential.name} required/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="email">Email Id <span className='star'>*</span></label>
                                    <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={bCredential.email} required/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="password">Password <span className='star'>*</span></label>
                                    <input type="password" name="password" placeholder='Password'  onChange={onchange} value={bCredential.password} required/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="cpassword">Confirm Password <span className='star'>*</span></label>
                                    <input type="password" name="cpassword" placeholder='Confirm Password' style={bcpass} onChange={onchange} value={bCredential.cpassword} required/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <input type="number" name="contactNumber" placeholder='Contact Number'  onChange={onchange} value={bCredential.contactNumber}/>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="website">Website</label>
                                    <input type="url" name="website" placeholder='Website'  onChange={onchange} value={bCredential.website}/>
                                </div>
                                <div className='ans'>
                                <label htmlFor="category">Category</label>
                                    <select name="category" onChange={onchange} value={bCredential.category}>
                                        <option value="None">Select</option>
                                        <option value="Beauty">Beauty and Fashion</option>
                                        <option value="Health and Fitness">Health and Fitness</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Anime Information">Anime Information </option>
                                        <option value="Travel">Travel</option>
                                        <option value="Vlogs">Vlogs</option>
                                        <option value="Enterntainment">Entertainment</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Education">Education</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Motivation">Motivation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='ans'>
                                    <label htmlFor="message">Message</label>
                                    <input type="text" name="message" placeholder='message'  onChange={onchange} value={bCredential.message}/>
                                </div>
                                
                                <div className="ans">
                                    {error}
                                </div>
                                <button type="submit" id='btn'>Submit</button>

                            </div>

                        </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegForm