import './cartButton.css'
import { useSelector } from 'react-redux'
import { selectTotal } from '../../../store/store'
import { BsCart4} from "react-icons/bs";
import { Link } from 'react-router-dom';
export default function CartButton () {

    const total = useSelector(selectTotal)

    return (
        <div className="cart-btn-container">
            <div>
               <Link to='/cart'> <button><div id='cart-icon'><BsCart4/></div><p>Vai al carrello</p><span>€{total},00</span></button></Link>
            </div>
        </div>
    )
}