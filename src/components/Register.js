import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BookForm from './BookForm';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import fail from '../images/popup/__info-sign/fail.svg';

const Register = (props) => {
  const { onRegister, isTooltipOpen, onTooltipClose } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoData, setInfoData] = useState({});
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister({ email, password })
      .then((res) => {
        if (res) {
          return history.push('/signin');
        }

        setEmail('');
        setPassword('');
        setInfoData({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          alt: 'Ошибка',
          src: fail,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <InfoTooltip
        infoData={infoData}
        isOpen={isTooltipOpen}
        onClose={onTooltipClose}
      />
      <Header link="Войти" path="/signin" />
      <BookForm
        name="book"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        link="Уже зарегистрированы? Войти"
        onSubmit={handleSubmit}
        path="/signin"
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
          />
        </label>
      </BookForm>
    </>
  );
};

export default Register;
