import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useContext } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from 'react-redux';



export default function Header() {
  const [changeClass, setchangeClass] = useState(document.documentElement.dir === 'rtl' ? 'ms-auto' : 'me-auto');
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setchangeClass(document.documentElement.dir === 'rtl' ? 'me-auto' : 'ms-auto');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

    return () => observer.disconnect();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-bolder fs-3"><Link className="nav-link" to="/">
          Mostafa's Shop
        </Link></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className={changeClass + ' ' + "navbar-nav p-2"}>
           
            <Link className="nav-link" to="/">
              Product List
            </Link>
            <Link className="nav-link position-relative" to="/cart">
              <span className={`position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger ${totalQuantity === 0 ? 'd-none' : ''}`}>
                {totalQuantity}
              </span>
              🛒 Cart

            </Link>
            <LanguageSwitcher />
            {!isAuthenticated && <Link to="/login" className=" align-self-center me-2 btn btn-outline-success">Login</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}
