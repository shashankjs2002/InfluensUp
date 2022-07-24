import {useState} from "react";
import FormContext from "./FormContext";

const FormState = (props) => {
    const [formName, setFormName] = useState('influencer-form')
    const [error, setError] = useState(null)
    const host = "https://influensup.herokuapp.com"

    const changeForm = (formName) => {
        let influencerForm = document.getElementsByClassName('form-1')[0]
        let brandForm = document.getElementsByClassName('form-2')[0]
        formName==='influencer-form' ? (setFormName('influencer-form')): (setFormName('brand-form'))
        if(formName==='brand-form'){
            brandForm.style.textDecorationLine ='underline';
            influencerForm.style.textDecorationLine ='none'     
        }
        else{
            influencerForm.style.textDecorationLine ='underline'
            brandForm.style.textDecorationLine ='none'
        }
    }

    return (
        <FormContext.Provider value={{formName, setFormName, changeForm, setError,error, host}}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormState;