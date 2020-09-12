import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavBar = ({ loggedIn, onSignOut }) => {
  const history = useHistory();


  return (
    <nav className="menu">
      {loggedIn
        ? (
          <>
            <p className="menu__item">{identifier}</p>
            <button onClick={onSignOut} className="menu__item menu__button">Выйти</button>
          </>
        )
        : <Link exact className="menu__item" to="/signup">Регистрация</Link>
      }
    </nav>
  )
}

export default NavBar;
