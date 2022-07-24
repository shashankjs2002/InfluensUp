import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import RegForm from './components/RegForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import FormState from './context/FormState';
import OurServices from './components/OurServices';
import OnSubmit from './components/OnSubmit';
import Influencer from './components/dashboard/Influencer';
import Brand from './components/dashboard/Brand';
import UserState from './context/UserState';
import Verified from './components/Verified';


function App() {
  return (
    <>
    <Router>
    <UserState> 
    <FormState> 

      <div className="App">
          <Navbar/>
          <Routes>

          <Route exact path='/' 
          element={
            <>
           <Home/>
            {/* <OurServices/> */}
            <RegForm/>
            </>
          }/>
          
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/onsubmit' element={<OnSubmit/>}/>
            <Route exact path='/verified' element={<Verified/>}/>
         
            <Route exact path='/influencer/dashboard' element={<Influencer/>}/>
            <Route exact path='/brand/dashboard' element={<Brand/>}/>
           
          
          
          {/* <Home/>
          <RegForm/>
        <Login/> */}
        </Routes>
      </div>
    </FormState>
    </UserState>
      </Router>
    </>
  );
}

export default App;
