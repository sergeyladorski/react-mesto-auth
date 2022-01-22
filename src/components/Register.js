import {React, useState} from 'react';
import { withRouter, Link } from 'react-router-dom';

export default function Register (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({ email, password })
  }

  return (
    <div className='auth-page'>
      <p className='auth-page__heading'>
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className='auth-page__form'>
        <fieldset className='auth-page__fieldset'>
          <input
            className='auth-page__input'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            autoComplete='off'
            onChange={handleEmailChange}
            value={email}
          />

          <input
            className='auth-page__input'
            id='password'
            name='password'
            minLength='5'
            maxLength='20'
            type='password'
            placeholder='Пароль'
            autoComplete='off'
            onChange={handlePasswordChange}
            value={password}
          />
        </fieldset>

        <div className='auth-page__button-container'>
          <button
            type='submit'
            className='auth-page__submit-button'
          >
            Зарегистрироваться
          </button>

          <div className='auth-page__signin'>
            <p className='auth-page__signin-text'>
              Уже зарегистрированы?
              <Link to='./Login' className='auth-page__login-link'>
                {' '}
                Войти
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}