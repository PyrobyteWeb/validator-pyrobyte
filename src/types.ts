export interface IResultValidation {
  passed: boolean;
  errors: string[];
}

export interface IResultAllValidation<Rules> {
  passed: boolean;
  errors: {
    [Property in keyof Rules]: string[];
  };
}

export type IData<Rules> = {
  [Property in keyof Rules]: string;
};

export interface IRule {
  [nameRule: string]: number | string | boolean;
}

export type IRules<Rules> = {
  [Property in keyof Rules]: IRule;
};
export interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string | number, param?: number): boolean;
    errorText(param: string | number): string;
  };
}
export interface IValidator<Rules> {
  check(name: keyof Rules, data: string): IResultValidation;
  checkAll(data: IRule): IResultAllValidation<Rules>;
  changeRule(
    nameRule: string,
    handler: (v: string) => boolean,
    errorText: string
  ): void;
}
