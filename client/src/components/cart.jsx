import {useEffect, useState} from 'react';
import '../styles/cart.css';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {ME, QUERY_CHECKOUT} from "../utils/queries.js";
import {loadStripe} from "@stripe/stripe-js";
import Auth from "../utils/auth.js";
import {useNavigate} from "react-router-dom";
import {UPDATE_CART} from "../utils/mutations.js";

const stripePromise = loadStripe("pk_test_51PlFYdHfqfAlbTXAqJEprt313NBdrNs2EEfbFknzQALyymBepeQlEzxT0JV6WVJasPFxSHlrOnGxLOr5moSnfuQN00E11ioENF");

const Cart = () => {
  const profile = Auth.getProfile();
  const { loading: userLoading, data: userData } = useQuery(ME, { variables: { _id: profile.data._id } });
  const navigate= useNavigate();
  const [cartItems, setCartItems] = useState();
  const [getCheckout, { loading, data }] = useLazyQuery(QUERY_CHECKOUT);
  const [updateCart] = useMutation(UPDATE_CART);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      // Unauthorized
      navigate("/signIn");
    }
  });

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({sessionId: data.getCheckout.session});
      });
    }
  });

  useEffect(() => {
    if (userLoading) return;

    setCartItems(userData.me.cart);
  }, [userLoading]);

  useEffect(() => {
    if (userLoading) return;

    if (cartItems && cartItems.length) {
      updateCart({ variables: { userId: userData.me._id, cart: cartItems }});
    }
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.bookId !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.bookId === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.bookId === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const calculateTotal = () => {
    return (cartItems) ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) : 0.00;
  };

  const handleCheckout = async (event) => {
    event.preventDefault();

    await getCheckout({variables: {books: cartItems}});
  }

  return (
    <div className="cart">
      {loading ? (<p>Loading...</p>) : "" }
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems && cartItems.map(item => (
              <div key={item.bookId} className="cart-item">
                <span className="item-name">{item.title}</span>
                <div className="item-quantity">
                  <button onClick={() => handleDecreaseQuantity(item.bookId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.bookId)}>+</button>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
                <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => handleRemoveItem(item.bookId)} className="Button">Remove</button>
              </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${calculateTotal()}</strong>
            <button onClick={handleCheckout} className="Button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
