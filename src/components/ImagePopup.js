import React from 'react';
import ButtonClose from './ButtonClose';
import PopupContainer from './PopupContainer';

function ImagePopup(props) {
  const { card, isOpen, onClose } = props;

  return (isOpen ? (
    <div className="popup popup_type_img popup_opened">
      <PopupContainer
        className="popup__img-wrapper"
        closeHandler={onClose}
      >
        <img
          src={card.link}
          alt={card.name}
          className="popup__img"
        />
        <p className="popup__img-title">{card.name}</p>
        <ButtonClose closeHandler={onClose} />
      </PopupContainer>
    </div>
  ) : (
    <div className="popup popup_type_img"></div>
  ));
}

export default ImagePopup;
