function required(value) {
  return value || value === 0;
}

function minLength(value, min) {
  return value.length >= min;
}

function maxLength(value, max) {
  return value.length <= max;
}

function isTrue(value) {
  return value === true;
}

function phone(value) {
  let numbers = value.replace(/[^\d]/g, '');
  return /^[\d]{10}$/.test(numbers);
}

function email(value) {
  return /^.+@.+$/.test(value);
}

function password(value) {
  return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(value);
}

function isNumber(value) {
  return /^[0-9]+$/.test(value);
}

function isText(value) {
  if (value.length > 2) {
    return /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Zа-яА-ЯёЁ\-' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(
      value,
    );
  } else {
    return /^[a-zA-Zа-яА-ЯёЁ']*$/.test(value);
  }
}

function isSymbols(value) {
  return /^([a-zA-Zа-яА-ЯёЁ0-9!\-.?_ ]+)$/gm.test(value);
}

function isDate(value) {
  let isSuccessFormat = /^(\d{2}.)(\d{2}.)(\d{4})$/.test(value);
  let result = false;
  let MIN_YEAR_MAJORITY = new Date().getFullYear() - 18;

  function isRangeNumber(min, max, number) {
    return number >= min && number <= max;
  }

  if (isSuccessFormat) {
    let [day, month, year] = value.split('.');
    let _day = parseInt(day.trim(), 10);
    let _month = parseInt(month.trim(), 10);
    let _year = parseInt(year.trim(), 10);

    result =
      isRangeNumber(1, 31, _day) &&
      isRangeNumber(1, 12, _month) &&
      isRangeNumber(1900, MIN_YEAR_MAJORITY, _year);
  }
  return result;
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
  isTrue: {
    handler: isTrue,
    errorText: function (param) {
      return false;
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
  isDate: {
    handler: isDate,
    errorText: function (params) {
      return 'Введите корректную дату';
    },
  },
  isSymbols: {
    handler: isSymbols,
    errorText: function (params) {
      return 'Разрешены только буквы или цифры';
    },
  },
};
