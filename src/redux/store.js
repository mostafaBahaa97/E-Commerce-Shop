import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './UserSlice';

const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading cart from localStorage', e);
    return [];
  }
};

const loadUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('user');
    return data
      ? { isAuthenticated: true, user: JSON.parse(data) }
      : { isAuthenticated: false, user: null };
  } catch (e) {
    console.error('Error loading user from localStorage', e);
    return { isAuthenticated: false, user: null };
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
};

const saveUserToLocalStorage = (state) => {
  try {
    if (state.user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(state.user.user));
    } else {
      localStorage.removeItem('user');
    }
  } catch (e) {
    console.error('Error saving user to localStorage', e);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: {
      items: loadCartFromLocalStorage(),
    },
    user: loadUserFromLocalStorage(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state);
  saveUserToLocalStorage(state);
});

export { store };
