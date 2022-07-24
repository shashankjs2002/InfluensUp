import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import userEdit from '../../assets/userEdit.svg'

const Influencer = () => {
  const navigate = useNavigate(null)
  const location = useLocation(null)
 
  const usercontext = useContext(UserContext)
  const {user, getInfluencer, newUser, setNewUser, updateInfluencer} = usercontext;
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    if(localStorage.getItem('type')==='influencer'){
      getInfluencer();
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
    updateInfluencer()
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
                          <label htmlFor="category" className='d-none ' ></label>
                          <select style={{}} name="category" onChange={onchange} value={newUser.category} onfocus='this.size=5;' onblur='this.size=1;'>
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
                    </strong>
                  </div>
                </div>
              </div>

              {/* Youtube Channel Link */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Youtube Channel Link</b> <span className='accordian-value'>{user.ytlink}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                        <label htmlFor="ytlink"></label>
                        <input type="text" name="ytlink" placeholder='Youtube Channel Link'  onChange={onchange} value={newUser.ytlink}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Youtube Channel Subscribers */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>YT Channel Subscribers</b> <span className='accordian-value'>{user.ytsubs}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                        <label htmlFor="ytsubs"></label>
                        <input type="number" name="ytsubs" placeholder='Youtube Channel Subscribers'  onChange={onchange} value={newUser.subs}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Instagram link */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>Instagram Link</b> <span className='accordian-value'>{user.iglink}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                          <label htmlFor="iglink"></label>
                          <input type="text" name="iglink" placeholder='Instagram Link'  onChange={onchange} value={newUser.iglink}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Instagram followers */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    <b style={{width: "180px"}}>IG Followers</b> <span className='accordian-value'>{user.igfollowers}</span>
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <strong>
                      <div className='ans'>
                          <label htmlFor="igfollowers"></label>
                          <input type="number" name="igfollowers" placeholder='Instagram Followers'  onChange={onchange} value={newUser.igfollowers}/>
                      </div>
                    </strong>
                  </div>
                </div>
              </div>
              
              <div style={{paddingTop:"50px"}}>

              <h4>No Active Campaign yet</h4>
              <h6>Active Campaigns are displayed here</h6>
              </div>
              
            </div>

           

          </div>
        }
    </>
  )
}

export default Influencer