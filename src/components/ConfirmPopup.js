import React from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';

function ConfirmPopup(props) {
  const {card} = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onCardDeleteConfirm(card._id);
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <ButtonSubmit>Да</ButtonSubmit>
    </PopupWithForm>
  );
}

export default ConfirmPopup;
