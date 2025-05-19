import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart,updateQuantity } from '../redux/cartSlice';

import { useState } from 'react';

const Cart = () => {
  
  const items = useSelector((state) => state.cart.items);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  console.log(items)
  
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1 || newQuantity > item.stock) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));

  };


  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4 p-4 mx-auto">
        <h2 className="text-center mb-4 text-dark">🛒 Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-center text-secondary fs-5">Your cart is empty.</p>
        ) : (
          <ul className="list-unstyled">
            <li className='d-flex justify-content-between w-100'>
                <span className='col-5 col-md-3'>Description</span>
                <span className='col-3 col-md-2'>Quantity</span>
                <span className='col-3'>Price</span>
                <span className='col-1 col-md-2'></span>
            </li>
            <hr />
            {items.map((item) => (
              <li key={item.id} className="d-flex align-items-center justify-content-between py-3">
                <div className='d-flex align-items-center w-100 '>
                  <div className='d-flex align-items-center w-25 me-5'>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '16px', borderRadius: '8px' }}
                    />
                    <span className="fw-semibold text-dark">{item.title}</span>
                  </div>
                  
                    <div className='d-flex gap-2 w-25'>
                      <span
                        className='btn btn-outline-secondary fw-bolder'
                        onClick={() => handleQuantityChange(item, 1)}
                      >+</span>
                      <span className='fs-4 fw-bolder'>{item.quantity}</span>
                      <span
                        className='btn btn-outline-secondary fw-bolder'
                        onClick={() => handleQuantityChange(item, -1)}
                      >-</span>
                    </div>
                <div className='w-25'>

                <span className="text-success fw-bold">
                  ${(item.price * item.quantity).toFixed(2)} $
                </span>

                </div>
                <div className='w-25'>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="btn btn-danger fw-medium px-3 py-2"
                  >
                  Remove
                </button>
                    </div>

                </div>
              </li>
            ))}

            <hr />

            <h4 className="text-end mt-3 text-dark">
              Total: ${totalPrice.toFixed(2)}
            </h4>

          </ul>
        )}

        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="btn btn-dark w-100 mt-4 py-3 fs-5 fw-semibold shadow-sm"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
