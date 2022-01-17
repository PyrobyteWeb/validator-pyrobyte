interface IResultValidation {
  passed: boolean;
  errors: string[];
}

interface IResultValidationAll {
  passed: boolean;
  errors: {
    [nameRule: string]: string[];
  };
}

interface IRule {
  [nameRule: string]: number | string | boolean;
}

interface IRules {
  [nameRule: string]: IRule;
}
interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string): boolean;
    errorText: string;
  };
}

declare class Validator {
  constructor(rules: IRules, rulesValidation?: IRulesValidation);
  check(name: string, data: string): IResultValidation;
  checkAll(data: { [nameRule: string]: string }): IResultValidationAll;
  changeRule(
    name: string,
    handler: (value: string) => boolean,
    errorText: string
  ): void;
}

declare let RULES_VALIDATION: IRulesValidation;

export {
  Validator,
  RULES_VALIDATION,
  IResultValidation,
  IRules,
  IRulesValidation,
  IRule,
  IResultValidationAll,
};
