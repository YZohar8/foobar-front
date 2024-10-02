import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './loginPage/LoginPage.js';
import RegisterPage from './registerPage/RegisterPage.js';
import FeedPage from './feedPage/FeedPage.js';
import LoadingScreen from './loadingScreen/LoadingScreen.js';

import postsData from './data/postsData.json'
import { addPost } from './fakeDatabase/postsFakeDatabase.js';

import usersData from './data/usersData.json'
import { addUser } from './fakeDatabase/usersFakeDatabase.js';

import responsesData from './data/responsesData.json'
import { addResponse, getNextResponseId } from './fakeDatabase/responsesFakeDatabase.js';




function App() {

  useEffect(() => {
    if (getNextResponseId() === 1) {
      postsData.forEach(post => {
        addPost(post);
      });
    
      usersData.forEach(user => {
        addUser(user);
      });
      console.log("the response");
      console.log(responsesData);
      responsesData.forEach(response => {
        addResponse(response);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/loading" element={<LoadingScreen />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
