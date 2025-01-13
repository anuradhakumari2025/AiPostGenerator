import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Start from "./pages/Start";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import AdminHome from "./pages/AdminHome";
import AdminProtectedWrapper from "./pages/AdminProtectedWrapper";
import AdminLogout from "./pages/AdminLogout";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/adminhome"
            element={
              <AdminProtectedWrapper>
                <AdminHome />
              </AdminProtectedWrapper>
            }
          />
          <Route
            path="/admin/logout"
            element={
              <AdminProtectedWrapper>
                <AdminLogout />
              </AdminProtectedWrapper>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
