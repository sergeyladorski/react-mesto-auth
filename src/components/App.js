import { React, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import Footer from './Footer';
import { api } from '../utils/api';
import { auth } from '../utils/auth'


export default function App() {
  //register & login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [signupState, setSignupState] = useState(false);
  const history = useHistory();
  //popup state
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  function handleMenuClick() {
    setIsMenuActive(!isMenuActive);
  }
  //user info & cards
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  //open popups
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //update user info
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //update user avatar
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //add a new place
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //close all popoups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipOpen(false);

    setSelectedCard({});
  }
  //card options
  function handleCardLike(card) {
    //check out whether there's my like on the card already
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    //send a request to API and get new card data
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }
  function handleCardDelete(card) {
    //send a request to API and get new cards array
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id === card._id ? '' : newCard));
        setIsConfirmPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //register a new user
  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setSignupState(true);
          history.push('/sign-in')
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupState(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  }
  //login & save token
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setSignupState(true);
        setEmail(email);
        setIsLoggedIn(true);
        history.push('/')
      })
      .catch((err) => {
        console.log(err);
        setSignupState(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
      })
  }
  //signout & remove token
  function handleSignout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }
  //if token in local storage is correct
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth.getData(token)
        .then((data) => {
          setIsLoggedIn(true)
          setEmail(data.data.email)
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }, [history])

  //initial user info & cards set
  useEffect(() => {
    if (isLoggedIn) {
      // вызываем получение данных
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(resData => {
          const [userData, cardList] = resData;
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          //header content depends on loggedIn state
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignout}
          email={email}
          isMenuActive={isMenuActive}
          onMenuClick={handleMenuClick}
        />
        <Switch>
          <ProtectedRoute
            //protected path available to authorized users only
            exact path='/'
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
          />

          <Route path='/sign-up'>
            <Register
              onRegister={handleRegister}
            />
          </Route>

          <Route path='/sign-in'>
            <Login
              onLogin={handleLogin}
            />
          </Route>

          <Route path='*'>
            {isLoggedIn
              //unauthorized user redirection
              ? <Redirect to='/' />
              : <Redirect to='/sign-in'
              />}
          </Route>
        </Switch>
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
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          name='view'
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          title='Вы уверены?'
          defaultValue='Да'
          card={selectedCard}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        />

        <InfoTooltip
          name='tooltip'
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          signupState={signupState}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}