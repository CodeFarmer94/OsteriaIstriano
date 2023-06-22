import React, { useState, useEffect, useRef } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectTotal } from '../../store/store';
import CartItem from './cartItem/CartItem';

export default function Cart() {
  const [isFixed, setIsFixed] = useState(false);
  const cartContainerRef = useRef(null);

  useEffect(() => {
    const cartContainerTop = cartContainerRef.current.offsetTop;
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsFixed(scrollPosition > cartContainerTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cart = useSelector(selectCart);
  const total = useSelector(selectTotal);
  const cartList = cart.map((item) => (
    <CartItem
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      key={item.name}
    />
  ));

  return (
    <div className={`cart-container ${isFixed ? 'fixed' : ''}`} ref={cartContainerRef}>
      <h2>Il tuo Ordine</h2>
      {cartList}
      <h3 style={{display: total > 0 ? "" : 'none'}}>
        <div>Subtotale</div>
        <div>€{total.toFixed(2).replace('.', ',')}</div>
      </h3>
      <button>Vai al Pagamento</button>
    </div>
  );
}
