import React, { useState } from 'react';
import BookForm from './BookForm';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import fail from '../images/popup/__info-sign/fail.svg';
import success from '../images/popup/__info-sign/success.svg';

const Login = ({ onLogin, isOpen, onClose, isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoData, setInfoData] = useState({
    text: 'Вы успешно зарегистрировались!',
    alt: 'Успешно',
    src: success,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      setInfoData({
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
        alt: 'Ошибка',
        src: fail,
      });
    }

    onLogin({ email, password })
      .then((res) => {
        if (!res) {
          setEmail('');
          setPassword('');
          setInfoData({
            text: 'Что-то пошло не так! Попробуйте ещё раз.',
            alt: 'Ошибка',
            src: fail,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isSignup
        && <InfoTooltip infoData={infoData} isOpen={isOpen} onClose={onClose} />
      }
      <InfoTooltip
        infoData={infoData}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Header link="Регистрация" path="/signup" />
      <BookForm
        name="login"
        title="Вход"
        buttonText="Войти"
        link="Ещё не зарегистрированы? Регистрация"
        onSubmit={handleSubmit}
        path="/signup"
      >
        <label className="book__label" htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className="book__input"
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required={true}
            minLength={2}
            pattern="[a-zA-Z0-9\_\-\.\@]+"
          />
        </label>
        <label className="book__label" htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            className="book__input"
            placeholder="Пароль"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required={true}
            minLength={8}
          />
        </label>
      </BookForm>
    </>
  );
};

export default Login;
