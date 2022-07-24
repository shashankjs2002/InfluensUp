import React, { useContext, useEffect,useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import userEdit from '../../assets/userEdit.svg'

const Brand = () => {
  const navigate = useNavigate(null)
  const location = useLocation(null)
 
  const usercontext = useContext(UserContext)
  const {user, getBrand, newUser, setNewUser,updateBrand} = usercontext;
  // const [newUser, setNewUser] = useState(user)
  useEffect(() => {
    if(!localStorage.getItem('token')){
      return navigate('/login')
    }
    if(localStorage.getItem('type')==='brand'){
      getBrand();
    }
    else{
      return navigate('/')
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('token')])
    
  const onchange = (e) => { 
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }
 
  const [accordion, setAccordion] = useState('close')
const toggle = () => {
  
  if(accordion==='close'){
    document.getElementById('edit-btn').style.display='none'
    document.getElementById('save-btn').style.display='inline'
    document.getElementById('close-btn').style.display='inline'
    
    setAccordion('open')
    }
    else{
      setAccordion('close')
      document.getElementById('save-btn').style.display='none'
      document.getElementById('close-btn').style.display='none'
      document.getElementById('edit-btn').style.display='inline'
    }
  }
  const onClose =() => {
    setNewUser(user)
    toggle()
  }

  const save =() => {
    updateBrand()
    toggle()
  }
  


  return (
    <>
        {
          user && newUser &&
          <div style={{padding: "80px 5vw"}}>
            <h1>Welcome! {user.name} </h1>
            <h4 style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{color:'black'}}>Info </span>
              <span data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
              <span id='edit-btn' className='accordion-btn' onClick={toggle}>Edit
                <img src={userEdit} alt="" width="25px"/>
                </span>

                 <span id='save-btn' className='accordion-btn' onClick={save} style={{display:'none'}}> Save Changes </span>
                 <span id='close-btn' className='accordion-btn' onClick={onClose} style={{display:'none'}}> Close </span>
              </span>
            </h4>

            <div className="accordion" id="accordionPanelsStayOpenExample" style={{position: "relative"}}>

              {/* Name */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
            
                    <b style={{width: "180px"}}>Name</b> 
                  <span className='accordian-value'>
                    {user.name}
                  </span>
                  
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                    <div className='ans'>
                        <label htmlFor="name"></label>
                        <input type="text" name="name" placeholder='Name'  onChange={onchange} value={newUser.name}/>
                    </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Email */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Email</b> <span className='accordian-value'>{user.email}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                    <div className='ans'>
                        <label htmlFor="email"></label>
                        <input type="email" name="email" placeholder='Email'  onChange={onchange} value={newUser.email} disabled/>
                    </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Contact Number */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Contact Number</b> <span className='accordian-value'>{user.contactNumber}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                          <label htmlFor="contactNumber"></label>
                          <input type="number" name="contactNumber" placeholder='Contact Number'  onChange={onchange} value={newUser.contactNumber}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Category/Niche */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Category</b> <span className='accordian-value'>{user.category}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                          <label htmlFor="category"></label>
                          <input type="text" name="category" placeholder='Category'  onChange={onchange} value={newUser.category}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Website Link */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Website</b> <span className='accordian-value'>{user.website}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                        <label htmlFor="website"></label>
                        <input type="text" name="website" placeholder='Website'  onChange={onchange} value={newUser.website}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Active Camp */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Active Campaign</b> <span className='accordian-value'>{user.activeCamp}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                        <label htmlFor="activeCamp"></label>
                        <input type="number" name="activeCamp" placeholder='Active Campaign'  onChange={onchange} value={newUser.activeCamp} disabled/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              {/* Total Camp */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Total Campaign</b> <span className='accordian-value'>{user.totalCamp}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                        <label htmlFor="totalCamp"></label>
                        <input type="number" name="totalCamp" placeholder='Total Campaign'  onChange={onchange} value={newUser.totalCamp} disabled/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              <div style={{paddingTop:"50px"}}>

              <h4>No Campaign yet</h4>
              <h6>Start New Campaign</h6>
              </div>
              
            </div>

           

          </div>
        }
    </>
  )
}

export default Brand