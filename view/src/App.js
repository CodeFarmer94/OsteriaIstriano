
import './App.css';
import Home from './components/home/Home';
import Profile from './components/Profile';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import { Route, Routes} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/menu' element={<Menu/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    
    </div>
  );
}

export default App;
