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

type ValidatorHandler<Data = any> = (v: Data, param?: number) => boolean;

interface IRulesValidation {
  [nameRule: string]: {
    handler: ValidatorHandler;
    errorText(param: number): string;
  };
}

type ValidatorData<Rules> = {
  [Property in keyof Rules]: string;
};

export interface IRule {
  [nameRule: string]: number | string | boolean;
}

export type IRules<Rules> = {
  [Property in keyof Rules]: IRule;
};

interface IValidator<Rules> {
  check<Data>(name: keyof Rules, data: Data): IResultValidation;
  checkAll<Data>(data: ValidatorData<Rules>): IResultAllValidation<Rules>;
  changeRule<Data>(
    nameRule: string,
    handler: ValidatorHandler<Data>,
    errorText: string
  ): void;
}

declare class Validator<Rules> implements IValidator<Rules> {
  constructor(rules: IRules<Rules>, rulesValidation?: IRulesValidation);
  changeRule<Data>(
    nameRule: string,
    handler: ValidatorHandler<Data>,
    errorText: string
  ): void;
  check<Data>(name: keyof Rules, data: Data): IResultValidation;
  checkAll<Data>(data: ValidatorData<Rules>): IResultAllValidation<Rules>;
}

declare let RULES_VALIDATION: IRulesValidation;

export { RULES_VALIDATION, Validator, IRulesValidation };
