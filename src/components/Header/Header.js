import React from 'react';
import {NavLink} from 'react-router-dom'

function Header() {

    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Главная</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
