// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Add })).toBe(16);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 6, action: Action.Subtract })).toBe(9);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 4, action: Action.Multiply })).toBe(40);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 3, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 13, b: 22, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: undefined, b: null, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: [], b: { test: 'test' }, action: Action.Multiply }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '48374', b: 334, action: Action.Add }),
    ).toBeNull();
  });
});
