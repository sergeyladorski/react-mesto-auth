import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

function App() {
  //registration & authorisation
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [signupState, setSignupState] = React.useState(false);
  const history = useHistory();
  //popup state
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  //user info & cards
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
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
  function handleTooltipOpen() {
    setIsTooltipOpen(true);
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
    // setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);

    setTimeout(() => {
      setSelectedCard({});
    }, 500);
  }
  //cards options
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
  function handleCardDelete(card) {
    //send a request to API and get new cards array
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id === card._id ? '' : newCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //registration
  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          handleSignupState();
          setTimeout(handleTooltipOpen, 500);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupState(false);
        setTimeout(handleTooltipOpen, 500);
      });
  }
  function handleSignupState() {
    setSignupState(true);
  }
  //authorisation
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //sign out & remove token
  function handleSignout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    history.push('/signin');
  }

  //SOMETHING IS WRONG HERE!!!
  React.useEffect(() => {
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
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(resData => {
        const [userData, cardList] = resData;
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Header
          // содержимое header зависит от состояния аторизации пользователя
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignout}
          email={email}
        />
        <Switch>
          <ProtectedRoute path={'/'}
            //защищенный путь, доступен только авторизованным пользователям
            exact path='/'
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path='/signup'>
            <Register
              //страница регистрации
              onRegister={handleRegister}
              openToolTip={handleTooltipOpen}
              signupState={handleSignupState}
            />
          </Route>

          <Route path='/signin'>
            <Login
              //страница авторизации
              onLogin={handleLogin}
              signupState={handleSignupState}
            />
          </Route>

          <Route>
            {isLoggedIn
              //неавторизованный пользователь перенаправляется на страницу авторизации
              ? <Redirect to='/' />
              : <Redirect to='/signin'
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

        <InfoTooltip
          name='tooltip'
          isOpen={isTooltipOpen}
          onCloce={closeAllPopups}
          signupState={signupState}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;