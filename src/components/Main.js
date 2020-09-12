import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container page__section">
      <section className="profile container__profile">
        <div className="profile__avatar">
          <img src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__img"
          />
          <button type="button"
            className="profile__update-av-btn"
            title="Сменить аватар"
            onClick={props.onEditAvatar}>
          </button>
        </div>
        <div className="profile__details">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button"
            className="profile__edit-btn"
            title="Редактировать профиль"
            onClick={props.onEditProfile}>
          </button>
          <p className="profile__info">{currentUser.about}</p>
        </div>
        <button type="button"
          className="profile__add-btn"
          title="Добавить фотографию"
          onClick={props.onAddCard}>
        </button>
      </section>
      <section className="elements">
        {props.cards.map(card => {
          return <Card
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
          />
        })}
      </section>
    </main>
  );
}

export default Main;
