export interface IResultValidation {
  passed: boolean;
  errors: string[] | { [nameRule: string]: string[] };
}

export interface IData {
  [nameRule: string]: string;
}

export interface IRule {
  [nameRule: string]: number | string | boolean;
}

export interface IRules {
  [nameRule: string]: IRule;
}
export interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string | number, param?: number): boolean;
    errorText(param: string | number): string;
  };
}
export interface IValidator {
  check(name: string, data: string): IResultValidation;
  checkAll(data: IRule): IResultValidation;
  changeRule(
    nameRule: string,
    handler: (v: string) => boolean,
    errorText: string
  ): void;
}
