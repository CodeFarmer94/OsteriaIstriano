
import './App.css';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import PaymentSucess from './components/payment/PaymentSucess';
import { Route, Routes} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Order from './components/order/Order';

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
        <Route path='/order' element={<Order/>} />
        <Route path="/payment" element={<PaymentSucess />} />
      </Routes>
    
    </div>
  );
}

export default App;
