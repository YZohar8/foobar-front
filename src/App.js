import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import LoginPage from './loginPage/LoginPage.js';
import RegisterPage from './registerPage/RegisterPage.js';
import FeedPage from './feedPage/FeedPage.js';
import LoadingScreen from './loadingScreen/LoadingScreen.js';
import ProfileFeed from './profileFeed/ProfileFeed.js';




function App() {


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
