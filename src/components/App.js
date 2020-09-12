import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
    .then(user => setCurrentUser(user))
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api.getCardList()
    .then((cards) => setCards(cards))
    .catch(err => console.error(err));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const handleConfirmPopup = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({ name, about }) => {
    return api.setUserInfo({ name, about })
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.error(err));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.setUserAvatar({ avatar })
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.error(err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeCardLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => (
        c._id === card._id ? newCard : c
      ));

      setCards(newCards);
    })
    .catch(err => console.error(err));
  };

  const handleCardDelete = (cardID) => {
    api.deleteCard(cardID)
    .then((newCard) => {
      const newCards = cards.filter((c) => (
        c._id === cardID ? null : newCard
      ));

      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => console.error(err));
  };

  const handleAddCardSubmit = ({ name, link }) => {
    return api.postCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.error(err));
  };

  if (!currentUser) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddCardClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmPopup}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCardSubmit={handleAddCardSubmit}
        />

        <ConfirmPopup
          card={selectedCard}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDeleteConfirm={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
