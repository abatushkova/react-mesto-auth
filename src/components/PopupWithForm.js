import React from 'react';
import ButtonClose from './ButtonClose';
import PopupContainer from './PopupContainer';

function PopupWithForm(props) {
  const {
    name,
    title,
    isOpen,
    onClose,
    onSubmit,
    children
  } = props;

  return (isOpen ? (
    <div className={`popup popup_type_${name} popup_opened`}>
      <PopupContainer
        className="popup__container"
        closeHandler={onClose}
      >
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          id={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
        <ButtonClose closeHandler={onClose} />
      </PopupContainer>
    </div>
  ) : (
    <div className={`popup popup_type_${name}`}></div>
  ));
}

export default PopupWithForm;
