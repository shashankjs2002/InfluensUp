import {useState} from "react";
import { useNavigate } from "react-router-dom";
import CampaignContext from "./CampaignContext";
const CampaignState = (props) => {
    const [campaigns, setCampaigns] = useState(null)
    // const [newUser, setNewUser] = useState(user)

    const navigate= useNavigate(null)
    const host = "http://localhost:5000";
    const fetchCampaigns = async () => {
        const response = await fetch(`${host}/api/campaign/fetch-campaigns`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        console.log(typeof(json))

        if(json.keys()!==0){
            console.log("success")
            setCampaigns(json)
            // setUser(json)
            // navigate('/influencer/dashboard');
            // setNewUser(json)
            
        } else{
            console.log("error")
        }
    }
    const addCampaign = async (campaign) => {
        const response = await fetch(`${host}/api/campaign/add-campaign`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
            ,
            body: JSON.stringify(campaign)
        });

        const json = await response.json();
        console.log(json)
        if(json._id){
            console.log("success")
            // getInfluencer()
            fetchCampaigns()
        } else{
            console.log("error")
        }
    }
    
    // const getBrand = async () => {
        //     const response = await fetch(`${host}/api/auth/get-brand`, {
            //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/json',
    //             'auth-token' : localStorage.getItem('token')
    //         }
    //         // ,
    //         // body: JSON.stringify({name: bCredential.name,email: bCredential.email, password: bCredential.password, contactNumber: bCredential.contactNumber, website: bCredential.website,  category: bCredential.category, message: bCredential.message})
    //     });
    //     const json = await response.json();
    //     console.log(json)
    //     if(json._id){
    //         console.log("success")
    //         setUser(json)
    //         // localStorage.setItem('token', json.authToken);
    //         // navigate('/brand/dashboard');
    //         setNewUser(json)
    //     } else{
    //         console.log("error")
    //     }
    // }
    // const updateInfluencer = async () => {
    //     const response = await fetch(`${host}/api/auth/update-influencer/${user._id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type' : 'application/json',
    //             'auth-token' : localStorage.getItem('token')
    //         }
    //         ,
    //         body: JSON.stringify(newUser)
    //     });

    //     const json = await response.json();
    //     console.log(json)
    //     if(json._id){
    //         console.log("success")
    //         getInfluencer()
    //     } else{
    //         console.log("error")
    //     }
    // }
    // const updateBrand = async () => {
    //     const response = await fetch(`${host}/api/auth/update-brand/${user._id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type' : 'application/json',
    //             'auth-token' : localStorage.getItem('token')
    //         }
    //         ,
    //         body: JSON.stringify(newUser)
    //     });

    //     const json = await response.json();
    //     console.log(json)
    //     if(json._id){
    //         console.log("success")
    //         getBrand()
    //     } else{
    //         console.log("error")
    //     }
    // }

    return (
        <CampaignContext.Provider value={{addCampaign, fetchCampaigns, campaigns, setCampaigns}}>
            {props.children}
        </CampaignContext.Provider>
    )
}

export default CampaignState;