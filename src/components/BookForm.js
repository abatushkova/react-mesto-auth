import React from 'react';
import { Link } from 'react-router-dom';

function BookForm ({
  name,
  title,
  buttonText,
  link,
  onSubmit,
  children,
  path
}) {
  return (
    <div className="book">
      <h2 className="book__title">{title}</h2>
      <form
        className="book__form"
        name={name}
        noValidate
        onSubmit={onSubmit}
      >
        <div className="book__content">
          {children}
        </div>
        <button type="submit" className="book__button">{buttonText}</button>
      </form>
      <Link to={path} className="book__link">{link}</Link>
    </div>
  );
}

export default BookForm;
