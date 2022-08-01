import {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
const UserState = (props) => {
    const [user, setUser] = useState(null)
    const [newUser, setNewUser] = useState(user)
    const [campaigns, setCampaigns] = useState(null)

    const navigate= useNavigate(null)
    const host = "http://localhost:5000";
    const getInfluencer = async () => {
        const response = await fetch(`${host}/api/auth/get-influencer`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        if(json._id){
            console.log("success")
            setUser(json)
            // navigate('/influencer/dashboard');
            setNewUser(json)

        } else{
            console.log("error")
        }
    }

    const getBrand = async () => {
        const response = await fetch(`${host}/api/auth/get-brand`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
            // ,
            // body: JSON.stringify({name: bCredential.name,email: bCredential.email, password: bCredential.password, contactNumber: bCredential.contactNumber, website: bCredential.website,  category: bCredential.category, message: bCredential.message})
        });
        const json = await response.json();
        console.log(json)
        if(json._id){
            console.log("success")
            setUser(json)
            // localStorage.setItem('token', json.authToken);
            // navigate('/brand/dashboard');
            setNewUser(json)
            // console.log(json.totalCamp)
            if(json.totalCamp> 0){
                
                    fetchCampaigns()
                
                // fetchCampaigns()
                // try{

                //     if(user){
                //         console.log("fetching")
                        
                //     }
                // }
                // catch{
                //     console.log("Not fetched")
                // }

            }
        } else{
            console.log("error")
        }
    }
    const updateInfluencer = async () => {
        const response = await fetch(`${host}/api/auth/update-influencer/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
            ,
            body: JSON.stringify(newUser)
        });

        const json = await response.json();
        console.log(json)
        if(json._id){
            console.log("success")
            getInfluencer()
        } else{
            console.log("error")
        }
    }
    const updateBrand = async () => {
        const response = await fetch(`${host}/api/auth/update-brand/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
            ,
            body: JSON.stringify(newUser)
        });

        const json = await response.json();
        console.log(json)
        if(json._id){
            console.log("success")
            getBrand()
        } else{
            console.log("error")
        }
    }
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
            console.log(json.length)
            let today = new Date()
            let active = 0
            let total = json.length
            json.map((campaign)=>{
                let endDate = new Date(campaign.endDate)
                if(endDate>today){
                    active++;       
                }
            })
            console.log(active)
            try{

                // newUser.totalCamp = total;
                // newUser.activeCamp = active;
                if(user){
                    setUser({...user, totalCamp : total, activeCamp : active })
                    setNewUser(user)
                }
                
                console.log(newUser)
                console.log(user)
                // updateBrand()
                // setUser(json)
                // navigate('/influencer/dashboard');
                // setNewUser(json)   
            } catch{
                console.log("not fetched")
            }        }
    }
    const addCampaign = async (campaign) => {
        // setUser(user.totalCamp = user.totalCamp+1)
        // setNewUser(user)
    
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
        // updateBrand()
    }

    return (
        <UserContext.Provider value={{user, setUser, getInfluencer, getBrand, newUser,setNewUser, updateInfluencer, updateBrand, addCampaign, fetchCampaigns, campaigns, setCampaigns}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
