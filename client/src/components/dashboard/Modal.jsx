import React, {useContext, useState, useRef, forwardRef, useEffect} from "react";
import UserContext from "../../context/UserContext";

const Modal = () => {
  const context = useContext(UserContext)
  const {addCampaign} = context;
  
  const [campaign, setCampaign] = useState({ campaignName : "", description: "", budget : "", startDate: Date.now(), endDate: "", campaignType: ""})
  
    // useEffect(() => {
    //   // console.log("first")
    //   setNote(enote)
    // }, [editNote])
    
    const closeBtn = useRef(null)
    
    const submitCampaign = (e) => {
      e.preventDefault();
      // console.log("Adding a note")
      // addNote(note.title,note.description, note.tag);
      addCampaign(campaign)
      closeBtn.current.click()
      // props.showalert('success','Done', 'Note Added Successfully')  
    }

    const onChange = (e) => {
      e.preventDefault()
        setCampaign({...campaign, [e.target.name] : e.target.value})
    }

    const close = () => {
      setCampaign({ campaignName : "", description: "", budget : "", startDate: Date.now(), endDate: "", campaignType: ""})
      closeBtn.current.click()
    }


//     let todayDate = new Date()
// console.log(todayDate.getFullYear(), todayDate.getDate(), todayDate.getMonth())

return (
  <>
      <div className={"modal fade"} id="exampleModal1" tabIndex="-1" role="dialog"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Campaign</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                <span aria-hidden="true" data-bs-dismiss="modal">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="campaignName" className="form-label">Campaign Name</label>
                  <input type="text" className="form-control" id="campaignName" aria-describedby="emailHelp" name='campaignName' onChange={onChange} value={campaign.name}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="description" name='description' onChange={onChange} value={campaign.description}/>
                </div>
                <div className='ans'>
                          <label htmlFor="campaignType">Campaign Type</label>
                          <select name="campaignType" onChange={onChange} value={campaign.campaignType}>
                              <option value="">---Select---</option>
                              <option value="Brand Awareness">Brand Awareness</option>
                              <option value="Product Promotion">Product Promotion</option>
                              <option value="Other">Other</option>
                          </select>
                      </div>
                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">Budget</label>
                  <input type="number" className="form-control" id="budget" name='budget' onChange={onChange} value={campaign.budget}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Starting Date</label>
                  <input type="date" className="form-control" id="startDate" name='startDate' onChange={onChange} value={campaign.startDate}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">Ending Date</label>
                  <input type="date" className="form-control" id="endDate" name='endDate' onChange={onChange} value={campaign.endDate}/>
                </div>
                {/* <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={closeBtn} data-bs-dismiss="modal" onClick={close}>Close</button>
              <button type="submit" className="btn btn-dark" onClick={submitCampaign}>Start</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal