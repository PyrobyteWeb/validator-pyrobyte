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

export const RULES_VALIDATION = {
  required: {
    handler: required,
    errorText: (param) => formingErrorText(param, 'Поле обязательно для заполнения'),
  },
  minLength: {
    handler: minLength,
    errorText: (param) => formingErrorText(param, `Минимальный размер текста ${param} символов`),
  },
  maxLength: {
    handler: maxLength,
    errorText: (param) => formingErrorText(param, `Максимальный размер текста ${param} символов`),
  },
  phone: {
    handler: phone,
    errorText: (param) => formingErrorText(param, 'Введите номер в 10-значном формате'),
  },
  email: {
    handler: email,
    errorText: (param) => formingErrorText(param, 'Введен некорректный Email'),
  },
  password: {
    handler: password,
    errorText: (param) => formingErrorText(param, 'Пароль не менее 6 символов, в том числе цифры,\nстрочные и заглавные буквы'),
  },
  isNumber: {
    handler: isNumber,
    errorText: (param) => formingErrorText(param, 'Введите цифры'),
  },
  isText: {
    handler: isText,
    errorText: (param) => formingErrorText(param, 'Введите корректные данные'),
  },
  isSymbols: {
    handler: isSymbols,
    errorText: (param) => formingErrorText(param, 'Разрешены только буквы или цифры'),
  },
};

/**
 *
 * @param param {string | number}
 * @param defaultValue {string}
 * @return {{length}}
 */
function formingErrorText(param, defaultValue = '') {
  let result;
  if(typeof param === 'string' && !!param.length) {
    result = param;
  } else {
    result = defaultValue;
  }
  return result;
}

export function changeRules(rulesValidation = RULES_VALIDATION, name, handler, errorText) {
  let result = rulesValidation;
  if(typeof name === 'string') {
    result[name] = {
      handler,
      errorText: (param) => formingErrorText(param, errorText),
    };
  } else {
    throw `Error name - a string is expected, but received ${typeof name}`;
  }
  return result;
}
