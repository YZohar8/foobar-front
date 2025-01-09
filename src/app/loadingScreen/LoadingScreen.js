import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {getUserByUsernameOrId} from '../connectToDB/usersConnectToDB.js'
import './LoadingScreen.css'


function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination } = location.state || {};

  useEffect(() => {

    const fetchUserData = async () => {
      const connectUsername = sessionStorage.getItem('connectUsername');

    if (!connectUsername) {
      sessionStorage.getItem('myUser');
      document.body.classList.remove('dark-mode');
      navigate('/'); 
    } else {

        if (!connectUsername) {
            sessionStorage.getItem('myUser');
            document.body.classList.remove('dark-mode');
            navigate('/');

        } else {

            const result = await getUserByUsernameOrId(connectUsername);


            if (result.success) {
              sessionStorage.setItem('myUser', JSON.stringify(result.user));
            } else {
                sessionStorage.getItem('myUser');
                document.body.classList.remove('dark-mode');
                navigate('/');
            }
        }
    }
    
    let timer;
   
      timer = setTimeout(() => {
        navigate(destination); 
      }, 1500);
    

    return () => clearTimeout(timer);
    }
    fetchUserData();
     
  }, [navigate, destination]);


  return (
    <div className="loading-screen">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
