import React, {useEffect, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";
import {evalApi} from "../../services/apis.js";
import logoImg from "../../assets/images/logo_icps.png";

const EvaluationPage = () => {
  const { token } = useParams()
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await evalApi.get(`/verify-token/${token}`);
  
        if (response.status === 200 ) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.log("Error verifying token: ", error)
        setIsValidToken(false);
      }
    }
    verifyToken();
  
  }, [token])

  if (!isValidToken) {
    return <div>Invalid or expired token</div>
  }

  return (
      <div className="py-7 px-6 flex flex-col gap-4 h-screen overflow-y-auto">
        <div className="flex justify-center items-center">
          <img src={logoImg} alt="logo" className="w-44"/>
        </div>
        <div className="">
          <Outlet/>
        </div>
      </div>
  )
};

export default EvaluationPage;
