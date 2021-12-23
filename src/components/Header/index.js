import React from 'react';
import './style.css';

const Header = () => {
    return (
        <header>
            <div className='headerItem-name'>Clockwise Clockware</div>
            <div className='headerItem-menu'>
                <div className='headerItem-menuItem'>Главная</div>
                <div className='headerItem-menuItem'>Войти</div>
            </div>
        </header>
    )
}

export default Header;