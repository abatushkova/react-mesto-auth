import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import * as auth from '../utils/auth';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

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
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    console.log(token);
    auth.getContent(token)
      .then((res) => {
        if (res && isMounted) {
          console.log(res);
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }

        return;
      })
      .catch((err) => console.error(err));
    }

    return () => isMounted = false;
  }, [loggedIn, history]);

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

  const onLogin = ({ email, password }) => {
    return auth.login({ email, password })
      .then((res) => {
        if (res && res.token) {
          setLoggedIn(true);
          history.push('/');
          return true;
        }

        setIsInfoTooltipOpen(true);
        return false;
      })
      .catch((err) => console.error(err));
  };

  const onRegister = ({ email, password }) => {
    return auth.register({ email, password })
      .then((res) => {
        if (res.status !== 400) {
          setIsSignup(true);
          setIsInfoTooltipOpen(true);
          return true;
        }

        setIsInfoTooltipOpen(true);
        return false;
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
            isSignup={isSignup}
            onLogin={onLogin}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={onRegister}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
