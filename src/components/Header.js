import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isLoggedIn, onSignOut, email }) {
    const { pathname } = useLocation();
    const linkText = `${pathname === '/signup' ? 'Войти' : 'Регистрация'}`;
    const linkURL = `${pathname === '/signup' ? '/signin' : '/signup'}`;

    return (
        <header className='header'>
            <img
                src={logo}
                alt='логотип Место'
                className='header__logo'
            />
            {isLoggedIn ? (
                //NO STYLES YET!!!
                <nav className='header__nav'>
                    <ul className='header__nav-list'>
                        <li>{email}</li>
                        <li onClick={onSignOut}>
                            <Link
                                to='/signin'
                                className='header__nav-link'
                            >
                                Выйти
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <Link
                    to={linkURL}
                    className='header__nav-link'
                >
                    {linkText}
                </Link>
            )}
        </header>
    );
}

export default Header;
