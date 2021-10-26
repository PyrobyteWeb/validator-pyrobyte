/**
 * Validation required
 *
 * @param value {string}
 * @return {boolean}
 */
function required(value) {
  return value || value === '0';
}

/**
 *
 * @param value {string}
 * @param min {number}
 * @return {boolean}
 */
function minLength(value, min) {
  return value.length >= min;
}

/**
 *
 * @param value {string}
 * @param max {number}
 * @return {boolean}
 */
function maxLength(value, max) {
  return value.length <= max;
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function phone(value) {
  // delete mask symbols
  let numbers = value.replace(/[^\d]/g, '');
  return /^[\d]{10}$/.test(numbers);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function email(value) {
  return /^.+@.+$/.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function password(value) {
  return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isNumber(value) {
  return /^[0-9]+$/.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isText(value) {
  if (value.length > 2) {
    return /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Zа-яА-ЯёЁ\-' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(
      value,
    );
  } else {
    return /^[a-zA-Zа-яА-ЯёЁ']*$/.test(value);
  }
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isSymbols(value) {
  return /^([a-zA-Zа-яА-ЯёЁ0-9!\-.?_ ]+)$/gm.test(value);
}

export const RULES_HANDLERS = {
  required: {
    handler: required,
    errorText: function (param) {
      return typeof param === 'string' && !!param.length
        ? param
        : 'Поле обязательно для заполнения';
    },
  },
  minLength: {
    handler: minLength,
    errorText: function (param) {
      return `Минимальный размер текста ${param} символов`;
    },
  },
  maxLength: {
    handler: maxLength,
    errorText: function (param) {
      return `Максимальный размер текста ${param} символов`;
    },
  },
  phone: {
    handler: phone,
    errorText: function (param) {
      return 'Введите номер в 10-значном формате';
    },
  },
  email: {
    handler: email,
    errorText: function (param) {
      return 'Введен некорректный Email';
    },
  },
  password: {
    handler: password,
    errorText: function (param) {
      return 'Пароль не менее 6 символов, в том числе цифры,\nстрочные и заглавные буквы';
    },
  },
  isNumber: {
    handler: isNumber,
    errorText: function (params) {
      return 'Введите цифры';
    },
  },
  isText: {
    handler: isText,
    errorText: function (param) {
      return typeof param === 'string' && !!param.length
        ? param
        : 'Введите корректные данные';
    },
  },
  isSymbols: {
    handler: isSymbols,
    errorText: function (params) {
      return 'Разрешены только буквы или цифры';
    },
  },
};
