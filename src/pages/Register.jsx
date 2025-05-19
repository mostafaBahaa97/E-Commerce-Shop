import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/UserSlice';
import { useNavigate } from 'react-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
library.add(fas, fab, far);

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            document.querySelector('.alert-danger').classList.remove('d-none');
            return;
        }

        const userData = {
            ...formData,
            password,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(loginSuccess(userData));
        navigate('/');
    };

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5 text-dark">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                            
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <span className="me-3 fa-fw">
                                                    <FontAwesomeIcon icon={['fas', 'user']} size="lg" />
                                                </span>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="name">Your Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <span className="me-3 fa-fw">
                                                    <FontAwesomeIcon icon={['fas', 'signature']} size="lg" />
                                                </span>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="username">User Name</label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        placeholder="don't use space"
                                                        className="form-control"
                                                        required
                                                        pattern="^\S+$"
                                                        title="Username must not contain spaces."
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <span className="me-3 fa-fw">
                                                    <FontAwesomeIcon icon={['fas', 'envelope']} size="lg" />
                                                </span>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <span className="me-3 fa-fw">
                                                    <FontAwesomeIcon icon={['fas', 'lock']} size="lg" />
                                                </span>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control"
                                                        required
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <span className="me-3 fa-fw">
                                                    <FontAwesomeIcon icon={['fas', 'key']} size="lg" />
                                                </span>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="repeatPassword">Repeat your password</label>
                                                    <input
                                                        type="password"
                                                        id="repeatPassword"
                                                        className="form-control"
                                                        required
                                                        value={repeatPassword}
                                                        onChange={handleRepeatPasswordChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="alert alert-danger d-none mt-3" role="alert">
                                                Passwords don't match
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <label className="form-check-label" htmlFor="terms">
                                                    <input className="form-check-input me-2" type="checkbox" id="terms" required />
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
