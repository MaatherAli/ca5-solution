
import { useEffect } from "react";
import {  useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate();
  const {user, isLogin}=useSelector(state=>state.users)
  useEffect(()=>{
    if(!isLogin)
      navigate('/login')




  },[isLogin])
  return (
    <div> 
   <h3>{user?.name}</h3>
   <h3>{user?.email}</h3>

      
      
      </div>
   
    

  );
};

export default Profile;
