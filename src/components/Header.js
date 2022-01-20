import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import Menu from './Menu';

function Header({ isLoggedIn, onSignOut, email }) {
    //linkURL & linkText depend on the current path
    const { pathname } = useLocation();
    const linkText = `${pathname === '/signup' ? 'Войти' : 'Регистрация'}`;
    const linkURL = `${pathname === '/signup' ? '/signin' : '/signup'}`;
    const { width } = useWindowDimensions();
    const isMobile = (width <= 767);

    return (
        <>
            {isLoggedIn && isMobile &&
                <Menu
                    email={email}
                    onSignOut={onSignOut}
                />
            }


            <header className={`header ${isLoggedIn && 'header_type_loggedin'}`}>
                <img
                    src={logo}
                    alt='логотип Место'
                    className='header__logo'
                />
                {isLoggedIn ? (
                    !isMobile &&
                    <Menu
                        email={email}
                        onSignOut={onSignOut}
                    />

                ) : (
                    <Link
                        to={linkURL}
                        className='header__nav-link'
                    >
                        {linkText}
                    </Link>
                )}
            </header>
        </>
    );
}

export default Header;
