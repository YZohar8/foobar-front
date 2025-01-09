import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import LoginPage from './app/loginPage/LoginPage.js';
import RegisterPage from './app/registerPage/RegisterPage.js';
import FeedPage from './app/feedPage/FeedPage.js';
import LoadingScreen from './app/loadingScreen/LoadingScreen.js';
import ProfileFeed from './app/profileFeed/ProfileFeed.js';
import { useEffect, useState } from 'react';
import DB from './app/connectToDB/fakeDB.js';

import posts from './data/posts.json'
import users from './data/users.json'





function App() {
  

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {

        DB.setUsers(users);
        DB.setPosts(posts);

        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    if (!isDataLoaded) {
      loadData();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/profilefeed" element={<ProfileFeed />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
