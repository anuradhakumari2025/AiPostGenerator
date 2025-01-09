import { Route,Routes } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Start from './pages/Start';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Home from './pages/Home';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/adminsignup' element={<AdminSignup/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
        </div>     
    </>
  )
}

export default App
