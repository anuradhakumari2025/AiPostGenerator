import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/adminlogin");
      }
    })
    .catch((error) => {
      console.log(error);
      navigate("/adminlogin");
    });
  return <div>AdminLogout</div>;
}

export default AdminLogout;
