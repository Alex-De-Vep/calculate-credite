import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {

    return (
        <footer className="footer">
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/">Помощь</Link>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
