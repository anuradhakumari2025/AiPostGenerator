//to check whether admin is authenticated or not then only navigate to adminhome page
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../context/AdminContext";
import axios from "axios";

function AdminProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(AdminDataContext);
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
   
    if (!token) {
      navigate("/adminlogin");
    }
  }, [token]);
  axios
  .get(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      setAdmin(response.data.admin);
      setIsLoading(false);
    }
  })
  .catch((error) => {
    console.log(error);
    localStorage.removeItem('token')
    navigate("/adminlogin");
  });
if (isLoading) {
  return <div>Loading...</div>;
}

  return <>{children}</>;
}

export default AdminProtectedWrapper;
