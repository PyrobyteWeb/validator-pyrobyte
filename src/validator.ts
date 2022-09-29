import { changeRules, RULES_VALIDATION } from "./utils";
import {
  IData,
  IResultAllValidation,
  IResultValidation,
  IRule,
  IRules,
  IRulesValidation,
  IValidator,
} from "./types";

export function validate(
  rulesHandlers: IRulesValidation,
  rules: IRule,
  value: string
): IResultValidation {
  let passed = true;
  let errors = [];

  if (rules) {
    // проходим по массиву правил для поля
    // param это данные для настройки функции валидатора
    for (let [nameRule, param] of Object.entries(rules)) {
      // берём правила валидации и проверяем значение с нужными параметрами
      let _param: number;
      if (typeof param === "number") {
        _param = param;
      } else {
        _param = 0;
      }
      if (!!rulesHandlers && Object.keys(rulesHandlers).length) {
        if (!rulesHandlers[nameRule].handler(value, _param)) {
          let errorText: string;
          if (typeof param === "string") {
            errorText = param;
          } else {
            errorText = rulesHandlers[nameRule].errorText(_param);
          }
          passed = false;
          errors.push(errorText);
        }
      } else {
        throw new Error(
          `rulesValidation is not valid, equalTo ${rulesHandlers}`
        );
      }
    }
  } else {
    throw new Error("nameRule is undefined for rules");
  }

  return {
    errors,
    passed,
  };
}

export function validateAll(
  rulesValidation: IRulesValidation,
  rules: IRules,
  data: IData
): IResultAllValidation {
  let result: IResultAllValidation = {
    errors: {},
    passed: true,
  };
  // Поле для которого правило
  if (!!data && typeof data === "object" && Object.keys(data).length) {
    for (const key in data) {
      if (rules[key]) {
        let status: IResultValidation = validate(
          rulesValidation,
          rules[key],
          data[key]
        );

        result.errors[key] = status.errors;
        if (!status.passed) {
          result.passed = false;
        }
      }
    }
  } else {
    throw new Error(`
      data for checkAll equalTo ${typeof data}${
      !Object.keys(data).length ? ", object is empty" : ""
    }
    `);
  }
  return result;
}

export class Validator implements IValidator {
  private readonly _rules: IRules;
  private _rulesValidation: IRulesValidation;

  constructor(
    rules: IRules,
    rulesValidation: IRulesValidation = RULES_VALIDATION
  ) {
    this._rules = rules;
    this._rulesValidation = rulesValidation;
  }

  checkAll(data: IData) {
    return validateAll(this._rulesValidation, this._rules, data);
  }

  check(name: string, data: string): IResultValidation {
    return validate(this._rulesValidation, this._rules[name], data);
  }

  changeRule(
    nameRule: string,
    handler: (v: string) => boolean,
    errorText: string
  ): void {
    this._setRulesValidation(
      changeRules(nameRule, handler, errorText, this._rulesValidation)
    );
  }

  _setRulesValidation(value: IRulesValidation): void {
    this._rulesValidation = value;
  }
}
