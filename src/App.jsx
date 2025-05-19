import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import "./App.css";
import Header from "./components/Header";
import { LanguageProvider } from './context/LanguageContext.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/cart"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <Header />
          <div className="container my-5">
            <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div id='loaderParent'>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product-details/:id" element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
