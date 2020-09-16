import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header/__logo/logo.svg';

const Header = ({ ...props }) => {
  const {
    loggedIn,
    onSignOut,
    email,
    path,
    link
  } = props;

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Логотип Место"
        className="header__logo"
      />
      {loggedIn ? (
        <>
          <input
            type="checkbox"
            id="burger-btn"
            className="header__burger-checkbox"
          />
          <label className="header__burger-icon" htmlFor="burger-btn">
            <span className="header__burger"></span>
          </label>
          <nav className="menu">
            <p className="menu__item">{email}</p>
            <button
              type="button"
              onClick={onSignOut} 
              className="menu__item menu__button"
            >
              Выйти
            </button>
          </nav>
        </>
      ) : (
        <Link className="header__link" to={path}>{link}</Link>
      )}
    </header>
  );
}

export default Header;
