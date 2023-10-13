import React, { useState, useEffect, useRef } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectTotal } from '../../store/store';
import CartItem from './cartItem/CartItem';
import { Link } from 'react-router-dom';
import { setCart, setTotal } from '../../store/store';

export default function Cart() {
  const [isFixed, setIsFixed] = useState(false);
  const cartContainerRef = useRef(null);
  const cart = useSelector(selectCart);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch()
  useEffect(() => {
    // Load cart from session storage if available and update Redux store
    const storedCart = JSON.parse(sessionStorage.getItem('cart'));
    if (storedCart && Array.isArray(storedCart)) {
      dispatch(setCart(storedCart));
    }
    const storedTotal = JSON.parse(sessionStorage.getItem('total'))
    if(storedTotal) {
      dispatch(setTotal(storedTotal))
    }

    const cartContainerTop = cartContainerRef.current.offsetTop;
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsFixed(scrollPosition > cartContainerTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  const cartList = cart.map((item) => (
    <CartItem
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      key={item.name}
    />
  ));


  return (
    <form className={`cart-container ${isFixed ? 'fixed' : ''}`} ref={cartContainerRef} >
      <h2>Il tuo Ordine</h2>
      {cartList}
      <h3 style={{display: total > 0 ? "" : 'none'}}>
        <div>Subtotale</div>
        <div>€{total.toFixed(2).replace('.', ',')}</div>
      </h3>
     { total > 0 ? <Link to='/order'><button>Vai al Pagamento</button></Link> : null}
    </form>
  );
}
