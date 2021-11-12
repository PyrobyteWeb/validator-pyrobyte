/**
 * Validation required
 *
 * @param value {string}
 * @return {boolean}
 */
import { IRulesValidation } from "../types";

function required(value: string): boolean {
  return !!value || value === "0";
}

/**
 *
 * @param value {string}
 * @param min {number}
 * @return {boolean}
 */
function minLength(value: string, min: number) {
  return value.length >= min;
}

/**
 *
 * @param value {string}
 * @param max {number}
 * @return {boolean}
 */
function maxLength(value: string, max: number) {
  return value.length <= max;
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function phone(value: string) {
  // delete mask symbols
  const numbers = value.replace(/[^\d]/g, "");
  return /^[\d]{10}$/.test(numbers);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function email(value: string) {
  return /^.+@.+$/.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function password(value: string) {
  return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isNumber(value: string) {
  return /^[0-9]+$/.test(value);
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isText(value: string) {
  let result;
  if (value.length > 2) {
    result = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Zа-яА-ЯёЁ\-' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(
      value
    );
  } else {
    result = /^[a-zA-Zа-яА-ЯёЁ']*$/.test(value);
  }
  return result;
}

/**
 *
 * @param value {string}
 * @return {boolean}
 */
function isSymbols(value: string) {
  return /^([a-zA-Zа-яА-ЯёЁ0-9!\-.?_ ]+)$/gm.test(value);
}

/**
 *
 * @param param {string | number}
 * @param defaultValue {string}
 * @return {{length}}
 */
export function formingErrorText(param: string | number, defaultValue = "") {
  let result;
  if (typeof param === "string" && !!param.length) {
    result = param;
  } else {
    result = defaultValue;
  }
  return result;
}

export const RULES_VALIDATION: IRulesValidation = {
  required: {
    handler: required,
    errorText: (param: string): string =>
      formingErrorText(param, "Поле обязательно для заполнения"),
  },
  minLength: {
    handler: minLength,
    errorText: (param: string): string =>
      formingErrorText(param, `Минимальный размер текста ${param} символов`),
  },
  maxLength: {
    handler: maxLength,
    errorText: (param: string): string =>
      formingErrorText(param, `Максимальный размер текста ${param} символов`),
  },
  phone: {
    handler: phone,
    errorText: (param: string): string =>
      formingErrorText(param, "Введите номер в 10-значном формате"),
  },
  email: {
    handler: email,
    errorText: (param: string): string =>
      formingErrorText(param, "Введен некорректный Email"),
  },
  password: {
    handler: password,
    errorText: (param: string): string =>
      formingErrorText(
        param,
        "Пароль не менее 6 символов, в том числе цифры,\nстрочные и заглавные буквы"
      ),
  },
  isNumber: {
    handler: isNumber,
    errorText: (param: string) => formingErrorText(param, "Введите цифры"),
  },
  isText: {
    handler: isText,
    errorText: (param: string) =>
      formingErrorText(param, "Введите корректные данные"),
  },
  isSymbols: {
    handler: isSymbols,
    errorText: (param: string) =>
      formingErrorText(param, "Разрешены только буквы или цифры"),
  },
};

export function changeRules(
  name: string,
  handler: (v: string | number, param?: number) => boolean,
  errorText: string,
  rulesValidation: IRulesValidation = RULES_VALIDATION
) {
  const result = rulesValidation;
  if (!!name.length) {
    result[name] = {
      handler,
      errorText: (param: string) => formingErrorText(param, errorText),
    };
  } else {
    throw new Error(
      `Error name - a string is expected, but received ${typeof name}`
    );
  }
  return result;
}
