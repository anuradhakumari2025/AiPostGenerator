import { Routes, Route, useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <button className='border-2 border-yellow-300 text-white p-4 ml-5' onClick={handleLoginClick}>Login</button>
      <button className='border-2 border-yellow-300 text-white p-4 mr-4' onClick={handleSignupClick}>Signup</button>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </div>
  );
}

export default Home;