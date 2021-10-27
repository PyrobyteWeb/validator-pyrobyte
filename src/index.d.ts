interface IResultValidation {
  passed: boolean,
  errors: string[],
}

interface IRule {
  [nameRule: string]: number | string | boolean,
}

interface IRules {
  [nameRule: string]: IRule,
}
interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string): boolean,
    errorText: string,
  }
}

declare class Validator {
  constructor(rules: IRules, rulesValidation?: IRulesValidation)
  check(name: string, data: string): IResultValidation;
  checkAll(data: string): IRulesValidation;
  changeRule(name: string, handler: (value: string) => boolean, errorText: string);
}

export {Validator};