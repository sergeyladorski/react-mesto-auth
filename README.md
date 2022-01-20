# Проект Место

## _Простой способ поделиться фото с друзьями и близкими_

[![Mesto](./public/favicon.ico)](https://github.com/sergeyladorski/react-mesto-auth)

Приложение с авторизацией и регистрацией пользователя. Оно взаимодействует сразу с двумя API:

- API авторизации `https://auth.nomoreparties.co`;
- API редактирования пользователя и получения карточек `https://mesto.nomoreparties.co/v1`.

Учебный проект от Яндекс.Практикум.
Профессия Веб-разработчик

- Основы бэкенда для фронтенд-разработчиков
- Фронтенд-аутентификация на React
- ✨Magic ✨

## Features

- Проект создан на базе предыдущего (доступен по ссылке [Mesto-React](https://github.com/sergeyladorski/mesto-react))
- Создайны роуты и опишисаны перенаправления:
  - /sign-up — для регистрации пользователя;
  - /sign-in — для авторизации пользователя.
- Компонентом HOC ProtectedRoute защищен роут /, чтобы на него не смогли перейти неавторизованные пользователи
- Сверстайны необходимые компоненты:
  - Login — компонент авторизации пользователя с необходимыми стейт-переменными;
  - Register — компонент регистрации пользователя с необходимыми стейт-переменными;
  - InfoTooltip — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
- Шапка для авторизованного и неавторизованного пользователя отличается.
- Реализована аутентификация пользователя.
- Настроена проверка валидности токена и получение email для вставки в шапку сайта.
- Настроена работа с localStorage так, чтобы токен сохранялся в нём и использовался при работе с сайтом. При повторном визите пользователю не нужно вновь авторизовываться.

## Tech

В проекте задействованы следующие технологии:

- HTML;
- CSS;
- ReactJS;
- ReactHooks;
- ReactRouter;
- API;
- Webpack;
- Git.

## Планы по доработке проекта:

- Валидация форм;
- Loader, блокировка и смена внешнего вида кнопки submit форм;
- Оптимизация кода. Если найду, что еще можно улучшить ;)

Перейти на страницу проекта (на данный момент недоступна в связи с ведущимися работами по разработке приложения).

Перейти на [страницу проекта](https://github.com/sergeyladorski/react-mesto-auth)).
Больше моих проектов на [GitHub](https://github.com/sergeyladorski)).

**Sergey Ladorski**
