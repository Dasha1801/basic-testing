// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAcc = getBankAccount(2340000);
    expect(bankAcc.getBalance()).toBe(2340000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAcc = getBankAccount(2340000);
    expect(() => bankAcc.withdraw(23400000)).toThrow(
      'Insufficient funds: cannot withdraw more than 2340000',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(20);
    const to = getBankAccount(0);
    expect(() => from.transfer(50, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(0);
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(10);
    acc.deposit(5);
    expect(acc.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(30);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(25);
  });

  test('should transfer money', () => {
    const from = getBankAccount(25);
    const to = getBankAccount(10);

    from.transfer(5, to);
    expect(from.getBalance()).toBe(20);
    expect(to.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await getBankAccount(10).fetchBalance();
    expect(typeof result === 'number' || result === null).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(324);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(35);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(35);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(324);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
