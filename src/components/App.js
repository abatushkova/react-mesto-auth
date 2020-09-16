import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    Promise.all([
      localStorage.getItem('token'),
      api.getUserInfo(),
      api.getCardList(),    
    ])
      .then(([token, user, cards]) => {
        if (token) {
          auth.checkToken(token)
            .then((res) => {
              if (res) {
                setEmail(res.data.email);
                setLoggedIn(true);
                history.push('/');
              }
            });
        }

        setCurrentUser(user);
        setCards(cards);    
      })
      .catch((err) => console.error(err));
  }, []);

  const onLogin = ({ email, password }) => {
    return auth.login({ email, password })
      .then((res) => {
        if (res && res.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
          return true;
        }

        setIsInfoTooltipOpen(true);
        return Promise.reject(new Error('on Sign in'));
      })
      .catch((err) => console.error(err));
  };

  const onRegister = ({ email, password }) => {
    return auth.register({ email, password })
      .then((res) => {
        if (res.data) {
          setEmail(res.data.email);
          setIsInfoTooltipOpen(true);
          return true;
        }

        setIsInfoTooltipOpen(true);
        return Promise.reject(new Error('on Sign up'));
      })
      .catch((err) => console.error(err));
  };

  const onSignOut = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  };

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
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({ name, about }) => {
    return api.setUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.setUserAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    return api.changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (
          c._id === card._id ? newCard : c
        ));

        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (cardID) => {
    return api.deleteCard(cardID)
      .then((newCard) => {
        const newCards = cards.filter((c) => (
          c._id === cardID ? null : newCard
        ));

        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  const handleAddCardSubmit = ({ name, link }) => {
    return api.postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  if (!currentUser) return null;

  return (
    <div className="page__content">
      <Switch>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          >
          <CurrentUserContext.Provider value={currentUser}>
            <Header
              onSignOut={onSignOut}
              email={email}
              loggedIn={loggedIn}
            />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmPopup}
            />
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
          </CurrentUserContext.Provider>
        </ProtectedRoute>
        <Route path="/signin">
          <Login
            onLogin={onLogin}
            isTooltipOpen={isInfoTooltipOpen}
            onTooltipClose={closeAllPopups}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={onRegister}
            isTooltipOpen={isInfoTooltipOpen}
            onTooltipClose={closeAllPopups}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
