import React from 'react';

function ButtonSubmit(props) {
  const { isDisabled, children } = props;
  const buttonSubmitClassName = (
    `popup__submit-btn ${isDisabled ? 'popup__submit-btn_disabled' : ''}`
  );

  return (
    <button
      type="submit"
      className={buttonSubmitClassName}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default ButtonSubmit;
