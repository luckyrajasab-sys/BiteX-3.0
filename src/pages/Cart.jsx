import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (placeOrder()) {
      navigate('/order-success');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <div className="cart-items glass">
        <h2>Your Cart</h2>
        <br />
        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add something delicious from the menu.</p>
            <Link to="/menu">
              <button className="btn btn-primary">Browse Menu</button>
            </Link>
          </div>
        ) : (
          <div id="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
                <button
                  className="btn btn-dark"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="summary glass">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>₹{cart.length > 0 ? 40 : 0}</span>
        </div>
        <hr style={{ borderColor: 'var(--surface-border)', margin: '15px 0' }} />
        <div className="summary-row total">
          <span>Total</span>
          <span id="total">₹{cart.length > 0 ? total + 40 : 0}</span>
        </div>
        
        {cart.length > 0 && (
          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
