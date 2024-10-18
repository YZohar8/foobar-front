import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoadingScreen.css'


function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination, state } = location.state || {};

  useEffect(() => {
    let timer;
   
      timer = setTimeout(() => {
        navigate(destination, {state}); 
      }, 2000);
    

    return () => clearTimeout(timer); 
  }, [navigate, destination, state]);


  return (
    <div className="loading-screen">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
