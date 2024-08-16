import React, { useState } from 'react';
import './style.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Book 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Book 2', price: 9.99, quantity: 1 },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
              <div className="item-quantity">
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </div>
              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${calculateTotal()}</strong>
          </div>
        </div>
      )}
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
