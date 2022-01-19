import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import '../blocks/register/register.css';

const Register = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({ email, password })
    // history.push('/signin');
    setTimeout(() => {
      setEmail('');
      setPassword('');
  }, 200);
  }

  return (
    <div className='register'>
      <p className='register__heading'>
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className='register__form'>
        <fieldset className='register__fieldset'>
          <input
            className='register__input'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            autoComplete='off'
            onChange={handleEmailChange}
            value={email}
          />

          <input
            className='register__input'
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
          className='register__submit-button'
        >
          Зарегистрироваться
        </button>
      </form>

      <div className='register__signin'>
        <p className='register__signin-text'>
          Уже зарегистрированы?
          <Link to='./Login' className='register__login-link'>
            {' '}
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(Register);