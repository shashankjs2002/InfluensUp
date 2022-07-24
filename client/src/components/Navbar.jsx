import React, { useEffect } from 'react'
import './styles/Navbar.css'
import ham from '../assets/ham.png'
import cross from '../assets/cross.svg'
import {Link, useLocation, useNavigate} from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate(null)
    const location = useLocation(null)
    
    const toggle = () => {
        let btn = document.getElementById('ham');
        let hamImg= document.getElementById('hamImg')
        let crossImg= document.getElementById('crossImg')
        if(btn.classList.contains('hide')){
            btn.classList.add('show')
            btn.classList.remove('hide')
            hamImg.style.display = 'none'
            crossImg.style.display = 'block'
            
        }
        else{
            btn.classList.add('hide')
            btn.classList.remove('show')
            crossImg.style.display = 'none'
            hamImg.style.display = 'block'
        }
    } 


    useEffect(() => {
    
    }, [navigate])
    

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('type')
        navigate('/')
    }
    
  return (
    <>
   
    <div className='nav'>
        <div className='content'> 
            <div className="brand">
                <h3>InfluensUp</h3>
            </div>

            <div className="menu">
                <ul>
                    <Link className='link' to='/'><li>Youtubers</li></Link>
                    <Link className='link' to='/'><li>Instagramers</li></Link>
                    <Link className='link' to='/'><li>MicroInfluencer</li></Link>
                    {!(localStorage.getItem('token')) ?
                        <Link className='link' to='/login'><li><button id='btn'> Login</button></li></Link>
                        :
                        <>

                        <Link className='link' to={`/${localStorage.getItem('type')}/dashboard`}><li><button id='btn'> Dashboard</button></li></Link>
                        <li onClick={handleLogout}><button id='btn'> Logout</button></li>
                        </>
            
                    }
                </ul>
            </div>
            <div className="hambtn" onClick={toggle}>
                 
                <img id='crossImg' style={{display:'none'}} src={cross} alt="" />
                <img id='hamImg' className='' src={ham} alt="" />
            </div>

        </div>
    </div>
    <div id='ham' className="sidebar hide">
        <ul>
            <Link className='link' to='/'><li>Youtubers</li></Link>
            <Link className='link' to='/'><li>Instagramers</li></Link>
            <Link className='link' to='/'><li>MicroInfluencer</li></Link>
            {!(localStorage.getItem('token')) ?
              <Link className='link' to='/login'><li><button id='btn'> Login</button></li></Link>
                :
                <>
                <Link className='link' to={`/${localStorage.getItem('type')}/dashboard`}><li><button id='btn'> Dashboard</button></li></Link>
                <li onClick={handleLogout}><button id='btn'> Logout</button></li>
                </>
            
            }
        </ul>
    </div>
    </>
  )
}

export default Navbar