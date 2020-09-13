import React from 'react';
import ButtonClose from './ButtonClose';
import PopupContainer from './PopupContainer';

function PopupWithForm(props) {
  return ((props.isOpen)
    ? <div className={`popup popup_type_${props.name} popup_opened`}>
        <PopupContainer
          className="popup__container"
          closeHandler={props.onClose}
        >
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__form"
            name={props.name}
            id={`${props.name}-form`}
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}
          </form>
          <ButtonClose closeHandler={props.onClose} />
        </PopupContainer>
      </div>
    : <div className={`popup popup_type_${props.name}`}></div>
  );
}

export default PopupWithForm;
