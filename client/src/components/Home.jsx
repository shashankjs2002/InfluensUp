import React, {useContext} from 'react'
import './styles/Home.css'
import statistic from '../assets/stats.gif'
import FormContext from '../context/FormContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate(null)
    
    const context = useContext(FormContext)
    const {changeForm} = context
  return (
    <>
        <div id='home' className=''>
            <div className="homeContent">

                <div className="left">
                    <h1>

                    Infuens<span>Up</span>
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aliquam repellat similique, exercitationem eius voluptatibus enim quo aspernatur consequuntur laboriosam harum voluptatum dolorum ea maiores, blanditiis quisquam ut. Debitis, quaerat.
                    </p>
                    <div className="btns">
                        <a href='#reg'><button id='btn' onClick={() => changeForm('influencer-form')}>I'm an Influencer</button></a>
                        <a href='#reg'><button id='btn' onClick={() => changeForm('brand-form')}>I'm a brand</button></a>
                    </div>
                </div>

                <div className="right">
                    <img id='stat' src={statistic} alt="" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Home