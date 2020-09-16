import React from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';

function ConfirmPopup(props) {
  const { card, isOpen, onClose } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onCardDeleteConfirm(card._id);
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <ButtonSubmit>Да</ButtonSubmit>
    </PopupWithForm>
  );
}

export default ConfirmPopup;
