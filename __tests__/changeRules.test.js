const {changeRules} = require("../src/utils");
const {RULES_VALIDATION} = require("../src/utils");


describe('Testing changeRules utils function', () => {
  test('Check change default result', () => {
    let result = changeRules('isText', (v) => !!v, 'some error');
    expect(result).toBe(RULES_VALIDATION);
  });
  test('Check changing old rule', () => {
    let result = changeRules('isText', (v) => !!v, 'some error');
    expect(result.isText.errorText(true)).toBe('some error');
  });
  test('Check changing new rule', () => {
    let result = changeRules('newRule', (v) => !!v, 'some new error');
    expect(result.newRule.errorText(true)).toBe('some new error');
  });
  test('Check throw error', () => {
    expect(() => changeRules(true, (v) => !!v, 'some error'))
      .toThrow('Error name - a string is expected, but received boolean');
  });
});
