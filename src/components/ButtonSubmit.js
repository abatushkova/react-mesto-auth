import React from 'react';

function ButtonSubmit(props) {
  const buttonSubmitClassName = (
    `popup__submit-btn ${props.isDisabled ? 'popup__submit-btn_disabled' : ''}`
  );

  return (
    <button
      type="submit"
      className={buttonSubmitClassName}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
}

export default ButtonSubmit;
