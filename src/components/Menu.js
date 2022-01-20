import { Link } from "react-router-dom";

function Menu(props) {
    return (
        <nav className='header__nav'>
            <ul className='header__nav-list'>
                <li>{props.email}</li>
                <li onClick={props.onSignOut}>
                    <Link
                        to='/signin'
                        className='header__nav-link header__nav-link_type_signout'
                    >
                        Выйти
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;