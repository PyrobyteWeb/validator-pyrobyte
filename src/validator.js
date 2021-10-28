import {changeRules, RULES_VALIDATION} from "./utils";

/**
 *
 * @param rulesHandlers
 * @param rules
 * @param value
 * @return {{passed: boolean, errors: *[]}}
 */
export function validate(rulesHandlers, rules, value) {
  let passed = true;
  let errors = [];

  if (rules) {
    // проходим по массиву правил для поля
    // param это данные для настройки функции валидатора
    for (let [nameRule, param] of Object.entries(rules)) {
      // берём правила валидации и проверяем значение с нужными параметрами
      let _param = param;
      if (param.value) {
        _param = param.value;
      }
      if(!!rulesHandlers && Object.keys(rulesHandlers).length) {
        if (!rulesHandlers[nameRule].handler(value, _param)) {
          let errorText = param.errorText
            ? param.errorText
            : rulesHandlers[nameRule].errorText(_param);
          passed = false;
          errors.push(errorText);
        }
      } else {
        throw new Error(`rulesValidation is not valid, equalTo ${rulesHandlers}`)
      }
    }
  } else {
    throw new Error('nameRule is undefined for rules');
  }

  return {
    errors,
    passed,
  };
}

export function validateAll(rules, data) {
  let result = {
    errors: {},
    passed: true,
  };
  // Поле для которого правило
  for (const key in data) {
    if (rules[key]) {
      let status = validate(rules[key], data[key]);
      result.errors[key] = status.errors;
      if (!status.passed) {
        result.passed = false;
      }
    }
  }
  return result;
}

/**
 * Class handle validator
 */
export class Validator {
  /**
   *
   * @param rules
   * @param rulesValidation
   */
  constructor(rules, rulesValidation = RULES_VALIDATION) {
    this._rules = rules;
    this._rulesValidation = rulesValidation;
  }

  /**
   *
   * @method checkAll
   * @param data {Object}
   * @return {{passed: boolean, errors: {}}}
   */
  checkAll(data) {
    return validateAll(this._rules, data);
  }

  /**
   *
   * @method check
   * @param name {string}
   * @param data {string}
   * @return {{passed: boolean, errors: *[]}}
   */
  check(name, data) {
    return validate(this._rulesValidation, this._rules[name], data);
  }

  changeRule(nameRule, handler, errorText) {
    this._setRulesValidation(changeRules(nameRule, handler, errorText, this._rulesValidation));
  }

  _setRulesValidation(value) {
    this._rulesValidation = value;
  }
}
