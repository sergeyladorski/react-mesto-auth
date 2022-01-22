import React from 'react';
import imageSuccess from '../images/icons/register-success.svg';
import imageError from '../images/icons/register-error.svg';
import { useLocation } from 'react-router-dom';


export default function InfoTooltip({ name, signupState, isOpen, onClose }) {
    const { pathname } = useLocation();
    const successText = `${pathname === '/sign-up'
        ? 'Вы успешно зарегистрировались!'
        : 'Вход выполнен успешно!'}`;
    const errorText = 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}>
            <div className='popup__container popup__container_type_tooltip'>
                <button
                    type='button'
                    aria-label='закрыть'
                    className='popup__close'
                    onClick={onClose}
                ></button>

                <img
                    className='popup__image'
                    src={signupState
                        ? imageSuccess
                        : imageError
                    }
                    alt={signupState
                        ? 'Success image'
                        : 'Error image'
                    }
                />
                <h2 className='popup__heading'>
                    {signupState
                        ? successText
                        : errorText
                    }
                </h2>
            </div>
        </div>
    );
}