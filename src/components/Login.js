import React from 'react';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin({ email, password })
  };

  return (
    <div className='auth-page'>
      <p className='auth-page__heading'>
        Вход
      </p>
      <form onSubmit={handleSubmit} className='auth-page__form'>
        <fieldset className='auth-page__fieldset'>
          <input
            required
            className='auth-page__input'
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            autoComplete='off'
            onChange={handleEmailChange}
            value={email}
          />

          <input
            required
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
            className='auth-page__submit-button'>
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

export default (Login);