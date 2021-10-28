export interface IResultValidation {
  passed: boolean;
  errors: string[];
}

export interface IRule {
  [nameRule: string]: number | string | boolean;
}

export interface IRules {
  [nameRule: string]: IRule;
}
export interface IRulesValidation {
  [nameRule: string]: {
    handler(value: string): boolean;
    errorText: string;
  };
}
