interface IResultValidation {
  passed: boolean;
  errors: string[];
}

interface IResultAllValidation<Rules> {
  passed: boolean;
  errors: {
    [Property in keyof Rules]: string[];
  };
}

interface IRule {
  [nameRule: string]: number | string | boolean;
}
interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string | number, param?: number): boolean;
    errorText(param: string | number): string;
  };
}
interface IValidator<Rules> {
  check(name: keyof Rules, data: string): IResultValidation;
  checkAll(data: IRule): IResultAllValidation<Rules>;
  changeRule(
    nameRule: string,
    handler: (v: string) => boolean,
    errorText: string
  ): void;
}

declare class Validator<Rules> implements IValidator<Rules> {
  changeRule(nameRule: string, handler: (v: string) => boolean, errorText: string): void;
  check(name: keyof Rules, data: string): IResultValidation;
  checkAll(data: IRule): IResultAllValidation<Rules>;
}

declare let RULES_VALIDATION: IRulesValidation;

export { RULES_VALIDATION, Validator };
