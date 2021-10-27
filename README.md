# validator-pyrobyte

### Installation

```shell
npm install --save validator-pyrobyte
```

### Example

```js

import { Validator } from 'validator-pyrobyte';

let rules = {
    text: {
        required: true,
        minLength: 10,
    },
    phone: {
        phone: true,
    },
};

let validator = new Validator();
let validationText = validator.check('text', valueText); // return IResultValidation
let validationAll =  validator.checkAll({
  text: valueNameText,
  phone: valueNamePhone,
}); // return IResultValidation

```

### Methods

Result methods validation `check` and `checkAll`:

```ts

interface IResultValidation {
    passed: boolean,
    errors: string[],
}

```

#### Check

```ts
check(nameRule: string, valueNameRule: string): IResultValidation;
```

#### CheckAll

```ts

interface IDataForCheckAll {
  [nameRule]: string,
}

checkAll(data: IDataForCheckAll): IResultValidation;
```

### type RULES_VALIDATION:

```ts
interface IRuleValidation {
  [nameRule]: {
    handler(): boolean,
    errorText: string,
  }
}

type IRulesValidation = IRulesValidation[];

```

### Default handlers RULES_VALIDATION:

```js


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

```
