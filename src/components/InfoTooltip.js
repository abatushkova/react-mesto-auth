import React from 'react';
import ButtonClose from './ButtonClose';
import PopupContainer from './PopupContainer';

function InfoTooltip({ infoData, isOpen, onClose }) {
  return ((isOpen)
    ? <div className={`popup popup_type_info popup_opened`}>
        <PopupContainer
          className="popup__container popup__container_type_info"
          closeHandler={onClose}
        >
          <img
            src={infoData.src}
            alt={infoData.alt}
            className="popup__info-sign"
          />
          <p className="popup__info-title">{infoData.text}</p>
          <ButtonClose closeHandler={onClose} />
        </PopupContainer>
      </div>
    : <div className={`popup popup_type_info`}></div>
  );
}

export default InfoTooltip;
