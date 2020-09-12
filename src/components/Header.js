import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header/__logo/logo.svg';

function Header({ ...props }) {
  return (
    <header className="header page__section">
      <img src={logo}
        alt="Логотип сайта Место"
        className="header__logo"
      />
      <nav className="menu">
        {props.loggedIn
          ? (<>
            <p className="menu__item">{props.email}</p>
            <button onClick={props.onSignOut} className="menu__item menu__button">Выйти</button>
          </>)
          : <Link className="menu__item menu__link" to={props.path}>{props.link}</Link>
        }
      </nav>
    </header>
  );
}

export default Header;
