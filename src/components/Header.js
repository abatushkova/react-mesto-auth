import React from 'react';
import logo from '../images/header/__logo/logo.svg';

function Header() {
  return (
    <header className="header page__section">
      <img src={logo}
        alt="Логотип сайта Место"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
