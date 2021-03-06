const {Validator, RULES_VALIDATION} = require('../src');
let validator;

describe('Testing class Validator', () => {
  describe('Testing method "check"', () => {
    beforeEach(() => {
      validator = new Validator({text: {required: true,}}, RULES_VALIDATION);
    });

    test('Check instance Validator',  () => {
      expect(validator).toBeInstanceOf(Validator);
    });

    test('Check result method "check"', () => {
      expect(validator.check('text', '100')).toStrictEqual({
        passed: true,
        errors: [],
      });
      expect(validator.check('text', '')).toStrictEqual({
        passed: false,
        errors: [RULES_VALIDATION.required.errorText(true)],
      });
      expect(validator.check('text', true)).toStrictEqual({
        passed: true,
        errors: [],
      });
    });

    test('Check throw error when nameRule undefined', () => {
      expect(() => validator.check('sdfsadfs', '')).toThrow();
    });

    test('Check set RULES_VALIDATION = null', () => {
      let validator = new Validator({text: {required: true}}, null);
      expect(() => validator.check('text', '100')).toThrow();
    });

    test('Check method "check" with empty rules', () => {
      let validator = new Validator({});
      expect(() => validator.check('text', '')).toThrow();
    });
  });

  describe('Testing method "checkAll"', () => {
    beforeEach(() => {
      validator = new Validator({text: {required: true,}, phone: {phone: true}});
    });

    test('Check throws for checkAll', () => {
      expect(() => validator.checkAll({})).toThrow();
      expect(() => validator.checkAll(null)).toThrow();
      expect(validator.checkAll(
        {
          text: '100',
          phone: '9239991122',
        }
      ))
        .toEqual({
          passed: true,
          errors: {
            text: [],
            phone: [],
          }
        });
      expect(validator.checkAll(
        {
          text: '',
          phone: '',
        }
      ))
      .toEqual({
        passed: false,
        errors: {
          text: [RULES_VALIDATION.required.errorText(true)],
          phone: [RULES_VALIDATION.phone.errorText(true)],
        }
      });
    });
  });
});
