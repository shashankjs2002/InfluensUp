import React, { useState } from 'react'
import Edit from '../../assets/pen-to-square-solid.svg'
import userEdit from '../../assets/userEdit.svg'
const CampaignList = (props) => {
    const { campaign } = props
    const [ecamp, setEcamp] = useState(campaign)
    // console.log(ecamp)
    const iconStyle = {
        width: "15px",
        cursor: "pointer",
        
    }
    let today = new Date()
    let startDate = new Date(campaign.startDate)
    //   console.log(startDate.toDateString())
    let endDate = new Date(campaign.endDate)
    let active = 'Ended'

    if (endDate > today) {
        // console.log(true)
        active = 'Active'
    }
    const [accordion1, setAccordion1] = useState('close')
    
    const onchange = (e) => { 
        setEcamp({...ecamp, [e.target.name]: e.target.value})
      }

    const toggle = () => {

        if (accordion1 === 'close') {
            // document.getElementById(`${campaign._id}`).style.display='inline'
            document.getElementById(`edit-btn-${campaign._id}`).style.display = 'none'
            document.getElementById(`save-btn-${campaign._id}`).style.display = 'inline'
            document.getElementById(`close-btn-${campaign._id}`).style.display = 'inline'

            setAccordion1('open')
        }
        else {
            // document.getElementById(`${campaign._id}`).style.display='none'
            setAccordion1('close')
            document.getElementById(`save-btn-${campaign._id}`).style.display = 'none'
            document.getElementById(`close-btn-${campaign._id}`).style.display = 'none'
            document.getElementById(`edit-btn-${campaign._id}`).style.display = 'inline'
        }
    }

    const onClose = () => {
        // setNewUser(user)
        toggle()
    }

    const save = () => {
        // updateBrand()
        toggle()
    }
    return (
        <>


            <div className='col-md-12 my-3'>
                <div className="accordion-item" style={{ background: "rgb(182 117 115)" }}>
                    <div className="accordion" id="accordionPanelsStayOpenExampleTwo${campaign._id}" style={{ position: "relative" }}>
                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}`}>
                            <div className=" accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}`} id={`panelsStayOpen-headingTwo${campaign._id}`} style={{ background: "rgb(138 85 110)" }} >
                                <div className="card-body mx-5">
                                    <span data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}`}>
                                        <div className="d-flex justify-content-between" style={{ flexWrap: 'wrap' }}>

                                            <div>
                                                <h5 className="card-title ">{campaign.campaignName} </h5><span>{active}</span>
                                            </div>


                                            <div className="mx-2 " style={{ right: '0', display: "none" }}>

                                                <span data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>

                                                    <img style={iconStyle} src={Edit} alt="Update" data-toggle="tooltip" data-placement="bottom" title="Edit" ></img>
                                                </span>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </h2>

                        {/* <h5 className="card-title">{campaignName}</h5> */}
                        {/* <p className="card-text" style={{padding:'0'}}>{campaign.description}</p>
                                            <p className="card-text" style={{padding:'0'}}><strong>Budget:</strong> {campaign.budget}</p> 
                                            <p className="card-text" style={{padding:'0'}}><strong>Start Date:</strong> {startDate.toDateString()}</p> 
                                            <p className="card-text" style={{padding:'0'}}><strong>End Date:</strong> {endDate.toDateString()}</p> 
                                            <p className="card-text" style={{padding:'0'}}><strong>Campaign Category:</strong> {campaign.campaignType}</p> 
                                            {campaign.influencers.length !==0 && <p className="card-text" style={{padding:'0'}}><strong>Shortlisted Influencers:</strong> 
                   

                                            {campaign.influencers.map((e)=>{
                                                return <span style={{color:"black"}}> {e.name},</span> 
                                                })}
                                            </p> }
                                            <p className="card-text" style={{padding:'0'}}><strong>Status:</strong><span style={{color:"black"}}>{active}</span></p>  */}



                        <div id={`panelsStayOpen-collapseTwo${campaign._id}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading${campaign._id}`}>

                            <div className="accordion-body">

                                <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'black' }}>Campaign Details </span>
                                    <span>
                                        <span id={`edit-btn-${campaign._id}`} className='accordion-btn' onClick={toggle} data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>Edit 
                                            <img src={Edit} alt="" width="20px" style={{marginLeft: "10px"}}/>
                                        </span>
                                        <span id={`save-btn-${campaign._id}`} className='accordion-btn' onClick={save} style={{ display: 'none' }} data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}> Save Changes </span>
                                        <span id={`close-btn-${campaign._id}`} className='accordion-btn' onClick={onClose} style={{ display: 'none' }} data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}> Close </span>
                                    </span>
                                </h4>

                                <div className="accordion" id="accordionPanelsStayOpenExample" style={{ position: "relative" }}>

                                    {/* Name */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>

                                                <b style={{ width: "180px" }}>Name</b>
                                                <span className='accordian-value'>
                                                    {campaign.campaignName}
                                                </span>

                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseTwo${campaign._id}-camp`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body">
                                                <strong>
                                                    <div className='ans'>
                                                        <label htmlFor="campaignName"></label>
                                                        <input type="text" name="campaignName" placeholder='Campaign Name' onChange={onchange} value={ecamp.campaignName} />
                                                    </div>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>
                                                <b style={{ width: "180px" }}>Description</b> <span className='accordian-value'>{campaign.description}</span>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseTwo${campaign._id}-camp`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <div className="accordion-body">
                                                <strong>
                                                    <div className='ans'>
                                                        <label htmlFor="description"></label>
                                                        <input type="text" name="description" placeholder='Description' onChange={onchange} value={ecamp.description} />
                                                    </div>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Budget */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>
                                            <b style={{ width: "180px" }}>Budget</b> <span className='accordian-value'>{campaign.budget}</span>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseTwo${campaign._id}-camp`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <div className="accordion-body">
                                                <strong>
                                                    <div className='ans'>
                                                        <label htmlFor="budget"></label>
                                                        <input type="number" name="budget" placeholder='Budget' onChange={onchange} value={ecamp.budget} />
                                                    </div>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Start Date */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>
                                            <b style={{ width: "180px" }}>Start Date</b> <span className='accordian-value'>{startDate.toDateString()}</span>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseTwo${campaign._id}-camp`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <div className="accordion-body">
                                                <strong>
                                                    <div className='ans'>
                                                        <label htmlFor="description"></label>
                                                        {/* <input type="email" name="description" placeholder='Description' onChange={onchange} value={} disabled /> */}
                                                    </div>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Date */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseTwo${campaign._id}-camp`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseTwo${campaign._id}-camp`}>
                                            <b style={{ width: "180px" }}>End Date</b> <span className='accordian-value'>{endDate.toDateString()}</span>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapseTwo${campaign._id}-camp`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-headingTwo${campaign._id}-camp`}>
                                            <div className="accordion-body">
                                                <strong>
                                                    <div className='ans'>
                                                        <label htmlFor="email"></label>
                                                        {/* <input type="email" name="email" placeholder='Email' onChange={onchange} value={newUser.email} disabled /> */}
                                                    </div>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                             
                                </div>
                                {/* </div> */}
                                {/* // </div> */}

                                {/* {console.log(Date(campaign.startDate))} */}
                                {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                                {/* //         </div> */}
                                {/* </div> */}
                            </div></div></div>


                </div>
            </div>
        </>
    )
}

export default CampaignList