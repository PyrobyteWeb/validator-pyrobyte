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

type ValueRuleChecked = number | string;
type ChangeRuleHandler = (v: string, param?: number) => boolean;

interface IRule {
  [nameRule: string]: ValueRuleChecked | boolean;
}
interface IRulesValidation {
  [nameRule: string]: {
    handler: ChangeRuleHandler;
    errorText(param: ValueRuleChecked): string;
  };
}

interface IValidator<Rules> {
  check(name: keyof Rules, data: string): IResultValidation;
  checkAll(data: IRule): IResultAllValidation<Rules>;
  changeRule(
    nameRule: string,
    handler: ChangeRuleHandler,
    errorText: string
  ): void;
}

declare class Validator<Rules> implements IValidator<Rules> {
  constructor(rules: Rules, rulesValidation?: IRulesValidation);
  changeRule(
    nameRule: string,
    handler: ChangeRuleHandler,
    errorText: string
  ): void;
  check(name: keyof Rules, data: string): IResultValidation;
  checkAll(data: IRule): IResultAllValidation<Rules>;
}

declare let RULES_VALIDATION: IRulesValidation;

export { RULES_VALIDATION, Validator };
