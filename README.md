# validator-pyrobyte

### Installation

```shell
npm install --save validator-pyrobyte
```

### Example

```ts

import {Validator} from 'validator-pyrobyte';

let rules = {
  text: {
    required: true,
    minLength: 10,
  },
  phone: {
    phone: true,
  },
};

let validator = new Validator<typeof rules>(rules);
let validationText = validator.check('text', ""); // {passed: false, errors: ['Message error']}
let validationAll = validator.checkAll({
  text: 'text',
  phone: '+79998887766',
}); // {passed: true, errors: []}

```

### Constants

#### type RULES_VALIDATION:

```ts
type TRuleValidation<Data = any> = {
  handler(v: Data, param?: number): boolean,
  errorText(param: number): string,
};

interface IRulesValidation {
  [nameRule]: TRuleValidation,
}

```

```js
import {RULES_VALIDATION} from 'validator-pyrobyte';

let rules: IRulesValidation = RULES_VALIDATION;

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

type check<Data> = (nameRule: keyof Rules, data: Data) => IResultValidation;
```

#### CheckAll

```ts
import {IRules} from "./index";

interface IResultAllValidation<Rules> {
  passed: boolean;
  errors: {
    [Property in keyof Rules]: string[];
  };
}

type ValidatorData<Rules> = {
  [Property in keyof Rules]: string;
};

type  checkAll<Data> = (data: ValidatorData<Rules>) => IResultAllValidation<Rules>;
```

#### ChangeRule

```ts
type changeRule<Data> = (
  nameRule: string,
  handler: ValidatorHandler<Data>,
  errorText: string
) => void;
```

```ts
import {Validator} from 'validator-pyrobyte';

let validator = new Validator({
  text: {
    isText: true,
  },
});
// new rule
validator.changeRule('new', (v) => !!v, 'some error text');

// change default rule
validator.changeRule('isText', (v) => /^(\d/.test(v), 'new error text');

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
