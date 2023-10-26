import { useEffect, useState } from 'react';
import './paymentSucess.css';

export default function PaymentSuccess() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('')
  
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch('http://localhost:8030/api/order', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        const parsedCart = data.cart.map(item => JSON.parse(item));
        setCart(parsedCart);
        setTotal(data.total);
        setStatus('Fulfilled');
        setTime(data.time);
        setNote(data.note);
      } catch (error) {
        console.error(error);
      }
    };
    const updateOrderStatus = async() => {
      try{
        const response = await fetch('http://localhost:8030/api/order', {
          method: 'PUT',
          credentials: 'include'
        })
        const data = await response.json();
        if(response.ok){
          console.log('PUT request successful!');
          console.log('Response:', data);
        } else {
          console.log('PUT request failed!');
          console.log('Status Code:', response.status);
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } catch (err) {
        console.error('Error:', err);
      }

    }
    updateOrderStatus()
    fetchOrder();
  }, []);

  return (
    <div className='payment-container'>
      <section>
        <h1 className='order-heading'>Grazie per il tuo ordine!</h1>
        <p className='delivery-time'>Il tuo ordine verrà consegnato alle <strong>{time}</strong></p>
        <ul className='cart-list'>
          {cart.map((item, index) => (
            <li key={index} >
              <div className='item-details'>
                <h2 className='item-name'>{item.name}</h2>
                <div className='item-info'>
                  <p className='item-price'>{item.price} €</p>
                  <p className='item-quantity'>x {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <h3 className='total'>Totale: {total} €</h3>
        {note && <p className='order-note'>Note: {note}</p>}
      </section>
    </div>
  );
}
