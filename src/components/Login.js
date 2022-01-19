import React from 'react';
import { useHistory } from 'react-router-dom';
import '../blocks/login/login.css';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

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
    // history.push('/');
  };

  return (
    <div className='login'>
      <p className='login__heading'>
        Вход
      </p>
      <form onSubmit={handleSubmit} className='login__form'>
        <fieldset className='login__fieldset'>
          <input
            required
            className='login__input'
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
            className='login__input'
            id='password'
            name='password'
            minLength='7'
            maxLength='20'
            type='password'
            placeholder='Пароль'
            autoComplete='off'
            onChange={handlePasswordChange}
            value={password}
          />
        </fieldset>

        <button
          type='submit'
          className='login__submit-button'>
          Войти
        </button>
      </form>
    </div>
  )
}

export default (Login);