const REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ERROR_GET_MOVIES =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
const ERROR_409 = "Такой пользователь уже есть :(";
const ERROR_EMAIL_OR_PASS = "Неправильные почта или пароль";
const SUCCESS_REGISTRATION = "Вы успешно зарегистрировались!";
const SUCCESS_LOGIN = "Добро пожаловать!";
const SUCCESS__UPDATE_PROFILE = "Данные профиля успешно обновлены!";
const ERROR_EMPTY_INPUT = "Поле не может быть пустым";
const ERROR_INVALID_EMAIL = "Введите корректный email адрес";
const ERROR_MIN_LENGTH = "Поле не может быть короче 2 символов";
const ERROR_MAX_LENGTH = "Поле не может быть длиннее 40 символов";
const ERROR_KEY_WORD = "Нужно ввести ключевое слово";
const ERROR_DELETE_MOVIE = "Во время удаления произошла ошибка";
const ERROR_SAVE_MOVIE = "Во время сохранения произошла ошибка";
const ERROR_UPDATE_PROFILE = "При обновлении данных произошла ошибка";
const ERROR_UNKNOWN = "Произошла ошибка";

export {
  REGEXP,
  ERROR_GET_MOVIES,
  SUCCESS_REGISTRATION,
  ERROR_409,
  SUCCESS_LOGIN,
  ERROR_EMAIL_OR_PASS,
  SUCCESS__UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  ERROR_EMPTY_INPUT,
  ERROR_INVALID_EMAIL,
  ERROR_MIN_LENGTH,
  ERROR_MAX_LENGTH,
  ERROR_KEY_WORD,
  ERROR_DELETE_MOVIE,
  ERROR_SAVE_MOVIE,
  ERROR_UNKNOWN,
};
