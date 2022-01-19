import React from 'react';
import registerSuccess from '../images/icons/register-success.svg';
import registerError from '../images/icons/register-error.svg';

function InfoTooltip({
    name, signupState,
    isOpen, onCloce }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}>
            <div className='popup__container popup__container_type_tooltip'>
                <button
                    type='button'
                    aria-label='закрыть'
                    className='popup__close'
                    onClick={onCloce}
                ></button>

                <img
                    className='popup__image'
                    src={signupState
                    ? registerSuccess
                    : registerError
                    }
                />
                <h2 className='popup__heading'>
                {signupState
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'
                }
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;