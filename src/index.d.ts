import {IData, IResultValidation, IRules, IRulesValidation, IResultAllValidation} from "./types";

declare class Validator {
  constructor(rules: IRules, rulesValidation?: IRulesValidation);
  check(name: string, data: string): IResultValidation;
  checkAll(data: IData): IResultAllValidation;
  changeRule(
    name: string,
    handler: (value: string) => boolean,
    errorText: string
  ): void;
}

declare let RULES_VALIDATION: IRulesValidation;

export { Validator, RULES_VALIDATION };
