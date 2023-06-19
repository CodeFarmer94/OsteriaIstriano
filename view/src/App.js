
import './App.css';
import Home from './components/home/Home';
import Profile from './components/Profile';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='/menu' element={<Menu/>} />
      </Routes>
    
    </div>
  );
}

export default App;
