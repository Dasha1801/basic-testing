// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should success all tests',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null', () => {
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

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 11, b: 242, action: '%' });
    expect(result).toBeNull();
  });
});
