const {formingErrorText} = require("../src/utils");

describe('Testing utils', () => {
  test('Check result return text', () => {
    expect(formingErrorText('text', 'default text')).toBe('text');
  });
  test('Check result return default text', () => {
    expect(formingErrorText(true, 'default text')).toBe('default text');
  });
  test('Check result return dont set arguments', () => {
    expect(formingErrorText()).toBe('');
  });
});
