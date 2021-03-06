import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src={logo} alt="TOdoList" />
                </div>
            </nav>
        </header>
    );
};

export default Header
