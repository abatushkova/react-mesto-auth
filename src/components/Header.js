import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header/__logo/logo.svg';

const Header = ({ ...props }) => {
  const [menuClass, setMenuClass] = useState('');
  const [burgerClass, setBurgerClass] = useState('');

  useEffect(() => {
    if (props.loggedIn) {
      setBurgerClass('');
    } else {
      setBurgerClass('header__burger_hidden');
    }
  }, [props.loggedIn]);

  const toggleMenu = () => {
    if (menuClass === '') {
      setMenuClass('menu_opened');
      setBurgerClass('header__burger_type_close');
    } else {
      setMenuClass('');
      setBurgerClass('');
    }
  };

  return (
    <header className="header page__section">
      {props.loggedIn
        ? <nav className={`menu ${menuClass}`}>
            <p className="menu__item">{props.email}</p>
            <button
              type="button"
              onClick={props.onSignOut} 
              className="menu__item menu__button"
            >
              Выйти
            </button>
          </nav>
        : <Link className="header__link" to={props.path}>{props.link}</Link>
      }
      <div className="header__handler">
        <img src={logo}
          alt="Логотип сайта Место"
          className="header__logo"
        />
        <button
          type="button"
          onClick={toggleMenu}
          className={`header__burger ${burgerClass}`}
        >
        </button>
      </div>
    </header>
  );
}

export default Header;
