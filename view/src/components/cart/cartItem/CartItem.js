import './cartItem.css';

export default function CartItem({ name, price, quantity }) {
  return (
    <div className="cart-item">
      <span>
        <div className="quantity">{quantity}</div>
        <div className="name">{name}</div> 
      </span>
        <div className="price">€{price}</div>

    </div>
  );
}
