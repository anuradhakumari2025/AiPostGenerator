import React, { useState, useEffect,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AdminDataContext } from "../context/AdminContext";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminData, setAdminData] = useState("");
  const {admin,setAdmin} = useContext(AdminDataContext)
  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    const admin = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/login`,
      admin
    );
    if (response.status === 200) {
      const data = response.data;
      setAdmin(data.admin);
      localStorage.setItem('token', data.token);
      navigate("/adminhome");
    }
    setEmail("");
    setPassword("");
  };

  // useEffect(() => {}, [adminData]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What is your Email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Take Charge?
          <Link to="/adminsignup" className="text-blue-600">
            {" "}
            Register as an Admin{" "}
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
