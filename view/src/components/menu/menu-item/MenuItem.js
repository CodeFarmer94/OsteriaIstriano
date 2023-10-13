import './menuItem.css';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart,selectCart,selectTotal,setTotal } from '../../../store/store';

export default function MenuItem({ name, price }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const total = useSelector(selectTotal)
  const cart = useSelector(selectCart)

  useEffect(()=>{
    
    const found = cart.find(item=> item.name === name)
  
    if(found){
      console.log(found)
      setQuantity(found.quantity)
    }
  },[])
  const handleAddItem = () => {
    const updatedQuantity = quantity + 1;
    const updatedTotal = parseInt(price) +  total 
    setQuantity(updatedQuantity);
    dispatch(addToCart({ name, price, quantity: updatedQuantity }));
    dispatch(setTotal(updatedTotal))
  };

  const handleRemoveItem = () => {
    if (quantity > 0) {
      const updatedQuantity = quantity - 1;
      const updatedTotal = total - parseInt(price)  
      setQuantity(updatedQuantity);
      dispatch(removeFromCart({ name, price, quantity: updatedQuantity }));
      dispatch(setTotal(updatedTotal))
    }
  };
  

  return (
    <div className="menu-item">
      <h2 className="name">{name}</h2>
      <h2 className="price">
        €{price}
        <span>
          <div id="minus" onClick={handleRemoveItem}>
            <AiFillMinusCircle />
          </div>
          {quantity}
          <div id="plus" onClick={handleAddItem}>
            <AiFillPlusCircle />
          </div>
        </span>
      </h2>
    </div>
  );
}
