import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState({
    inputClass: '',
    errorClass: '',
    errorMsg: ''
  });
  const [descriptionError, setDescriptionError] = useState({
    inputClass: '',
    errorClass: '',
    errorMsg: ''
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => {
    const input = evt.target;
    setName(input.value);

    if (!input.validity.valid) {
      setNameError({
        inputClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        errorMsg: input.validationMessage
      });
      setIsFormValid(false);
    } else {
      setNameError({
        inputClass: '',
        errorClass: '',
        errorMsg: ''
      });
      setIsFormValid(true);
    }
  };

  const handleDescriptionChange = (evt) => {
    const input = evt.target;
    setDescription(input.value);

    if (!input.validity.valid) {
      setDescriptionError({
        inputClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        errorMsg: input.validationMessage
      });
      setIsFormValid(false);
    } else {
      setDescriptionError({
        inputClass: '',
        errorClass: '',
        errorMsg: ''
      });
      setIsFormValid(true);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    props.onUpdateUser({
      name,
      about: description
    })
    .finally(() => {
      setIsFormValid(true);
      setIsLoading(false);
    });
  };

  const handleClose = () => {
    props.onClose();

    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsFormValid(true);
    setNameError({
      inputClass: '',
      errorClass: '',
      errorMsg: ''
    });
    setDescriptionError({
      inputClass: '',
      errorClass: '',
      errorMsg: ''
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="name-input">
        <input
          type="text"
          name="name"
          id="name-input"
          className={`popup__input ${nameError.inputClass}`}
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
          pattern="[a-zA-Zа-яА-ЯёЁ\s-]+"
          minLength={2}
          maxLength={40}
          required={true}
        />
        <span
          className={`popup__error ${nameError.errorClass}`}
          id="name-input-error"
        >
          {nameError.errorMsg}
        </span>
      </label>
      <label className="popup__label" htmlFor="about-input">
        <input
          type="text"
          name="about"
          id="about-input"
          className={`popup__input ${descriptionError.inputClass}`}
          placeholder="О себе"
          value={description}
          onChange={handleDescriptionChange}
          minLength={2}
          maxLength={200}
          required={true}
        />
        <span
          className={`popup__error ${descriptionError.errorClass}`}
          id="about-input-error"
        >
          {descriptionError.errorMsg}
        </span>
      </label>
      <ButtonSubmit isDisabled={!isFormValid}>
        {isLoading ? 'Загрузка...' : 'Сохранить'}
      </ButtonSubmit>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
