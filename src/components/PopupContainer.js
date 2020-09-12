import React, { useEffect, useRef } from 'react';

function PopupContainer(props) {
  const popupContainer = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('click', handleClick, false);
      document.removeEventListener('keydown', handleEsc, false);
    }
  });

  const handleClick = (evt) => {
    if (
      popupContainer.current 
      && !popupContainer.current.contains(evt.target)
    ) {
      props.closeHandler();
    }
  };

  const handleEsc = (evt) => {
    if (evt.key && evt.key === 'Escape') {
      props.closeHandler();
    }
  };

  return (
    <div className={props.className} ref={popupContainer}>
      {props.children}
    </div>
  );
}

export default PopupContainer;
