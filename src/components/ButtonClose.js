import React from 'react';

function ButtonClose(props) {
  return (
    <button
      type="button"
      className="popup__close-btn"
      title="Закрыть"
      onClick={props.closeHandler}>
    </button>
  );
}

export default ButtonClose;
