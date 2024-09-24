import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import LoginPage from './loginPage/LoginPage.js';
import RegisterPage from './registerPage/RegisterPage.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
