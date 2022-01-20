import React from 'react';
import registerSuccess from '../images/icons/register-success.svg';
import registerError from '../images/icons/register-error.svg';
import { useHistory } from 'react-router-dom';

function InfoTooltip({
    name, signupState,
    isOpen, onCloce }) {

    const history = useHistory();
    //push user to signin in case of success tooltip
    function handleSuccesTooltipClose() {
        onCloce();
        history.push('/signin');
    }

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}>
            <div className='popup__container popup__container_type_tooltip'>
                <button
                    type='button'
                    aria-label='закрыть'
                    className='popup__close'
                    onClick={signupState
                        ? handleSuccesTooltipClose
                        : onCloce
                    }
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