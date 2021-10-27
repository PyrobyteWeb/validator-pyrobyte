import {changeRules, RULES_VALIDATION} from "./utils";

/**
 *
 * @param rulesHandlers
 * @param rules
 * @param value
 * @return {{passed: boolean, errors: *[]}}
 */
function validate(rulesHandlers, rules, value) {
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
      if (!rulesHandlers[nameRule].handler(value, _param)) {
        let errorText = param.errorText
          ? param.errorText
          : rulesHandlers[nameRule].errorText(_param);
        passed = false;
        errors.push(errorText);
      }
    }
  }

  return {
    errors,
    passed,
  };
}

function validateAll(rules, data) {
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
    this._rulesHandlers = rulesValidation;
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
    this._setRulesValidation(changeRules(this._rulesValidation, nameRule, handler, errorText));
  }

  _setRulesValidation(value) {
    this._rulesValidation = value;
  }
}
