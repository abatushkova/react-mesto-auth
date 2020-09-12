import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const {card} = props;
  const currentUser = useContext(CurrentUserContext);
  
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeBtnClassName = (
    `elements__like-btn ${isLiked && 'elements__like-btn_active'}`
  );

  const handleClick = () => {
    props.onCardClick(card);
  };
  const handleLikeClick = () => {
    props.onCardLike(card);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(card);
  };

  const buttonDelete = (card.owner._id === currentUser._id)
  && <button type="button" 
    className="elements__delete-btn" title="Удалить" 
    onClick={handleDeleteClick}></button>;

  return (
    <div className="elements__item">
      {buttonDelete}
      <img
        src={card.link}
        alt={card.name}
        className="elements__img"
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like">
          <button
            type="button"
            className={cardLikeBtnClassName}
            title="Мне нравится"
            onClick={handleLikeClick}>
          </button>
          <span className="elements__like-counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
