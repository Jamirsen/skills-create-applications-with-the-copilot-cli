/**
 * Comprehensive Unit Tests for Calculator Functions
 * Tests all four basic operations: addition, subtraction, multiplication, and division
 * Includes edge cases and examples from calc-basic-operations.png
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('Calculator - Addition', () => {
  // Basic addition tests
  test('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('example from image: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds multiple numbers', () => {
    expect(add(1, 2, 3, 4, 5)).toBe(15);
  });

  test('adds negative numbers', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test('adds positive and negative numbers', () => {
    expect(add(10, -5)).toBe(5);
  });

  test('adds decimal numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
  });

  test('adds zero', () => {
    expect(add(5, 0)).toBe(5);
  });

  test('adds single number', () => {
    expect(add(42)).toBe(42);
  });

  test('adds with no arguments returns 0', () => {
    expect(add()).toBe(0);
  });
});

describe('Calculator - Subtraction', () => {
  // Basic subtraction tests
  test('subtracts two positive numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('example from image: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts multiple numbers', () => {
    expect(subtract(100, 20, 10, 5)).toBe(65);
  });

  test('subtracts resulting in negative', () => {
    expect(subtract(5, 10)).toBe(-5);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(10, -5)).toBe(15);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(10.5, 2.5)).toBe(8);
  });

  test('subtracts zero', () => {
    expect(subtract(10, 0)).toBe(10);
  });

  test('subtracts from zero', () => {
    expect(subtract(0, 5)).toBe(-5);
  });

  test('subtracts single number returns the number', () => {
    expect(subtract(42)).toBe(42);
  });
});

describe('Calculator - Multiplication', () => {
  // Basic multiplication tests
  test('multiplies two positive numbers', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('example from image: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies multiple numbers', () => {
    expect(multiply(2, 3, 4)).toBe(24);
  });

  test('multiplies by zero', () => {
    expect(multiply(10, 0)).toBe(0);
  });

  test('multiplies negative numbers', () => {
    expect(multiply(-5, -3)).toBe(15);
  });

  test('multiplies positive and negative', () => {
    expect(multiply(5, -3)).toBe(-15);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(2.5, 4)).toBe(10);
  });

  test('multiplies by one', () => {
    expect(multiply(42, 1)).toBe(42);
  });

  test('multiplies single number returns the number', () => {
    expect(multiply(42)).toBe(42);
  });

  test('multiplies with no arguments returns 1', () => {
    expect(multiply()).toBe(1);
  });
});

describe('Calculator - Division', () => {
  // Basic division tests
  test('divides two positive numbers', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('example from image: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides resulting in decimal', () => {
    expect(divide(10, 4)).toBe(2.5);
  });

  test('divides multiple numbers', () => {
    expect(divide(100, 2, 5)).toBe(10);
  });

  test('divides negative numbers', () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test('divides positive by negative', () => {
    expect(divide(10, -2)).toBe(-5);
  });

  test('divides decimal numbers', () => {
    expect(divide(7.5, 2.5)).toBe(3);
  });

  test('divides by one', () => {
    expect(divide(42, 1)).toBe(42);
  });

  test('divides zero by number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('divides single number returns the number', () => {
    expect(divide(42)).toBe(42);
  });

  // Edge case: Division by zero
  test('throws error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });

  test('throws error when dividing by zero in chain', () => {
    expect(() => divide(100, 5, 0)).toThrow('Division by zero is not allowed');
  });

  test('throws error when dividing by zero with multiple divisors', () => {
    expect(() => divide(50, 2, 0, 5)).toThrow('Division by zero is not allowed');
  });
});

describe('Calculator - Calculate Function', () => {
  test('calculate with addition', () => {
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('calculate with subtraction', () => {
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('calculate with multiplication', () => {
    expect(calculate('*', 45, 2)).toBe(90);
  });

  test('calculate with division', () => {
    expect(calculate('/', 20, 5)).toBe(4);
  });

  test('throws error for unknown operation', () => {
    expect(() => calculate('%', 10, 3)).toThrow("Unknown operation '%'");
  });

  test('throws error for invalid operation', () => {
    expect(() => calculate('invalid', 5, 3)).toThrow("Unknown operation 'invalid'");
  });
});

describe('Calculator - Complex Edge Cases', () => {
  test('addition with very large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });

  test('subtraction with very small decimals', () => {
    expect(subtract(0.3, 0.2)).toBeCloseTo(0.1, 10);
  });

  test('multiplication with fractions', () => {
    expect(multiply(0.1, 0.2)).toBeCloseTo(0.02, 10);
  });

  test('division with precise decimals', () => {
    expect(divide(1, 3)).toBeCloseTo(0.333333, 5);
  });

  test('chain operations: (100 - 50) using calculate', () => {
    expect(calculate('-', 100, 50)).toBe(50);
  });

  test('multiple additions match sum', () => {
    const result = add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    expect(result).toBe(55);
  });

  test('multiple multiplications', () => {
    expect(multiply(2, 2, 2, 2)).toBe(16);
  });
});

describe('Calculator - All Image Examples', () => {
  test('all examples from calc-basic-operations.png pass', () => {
    expect(add(2, 3)).toBe(5);       // 2 + 3
    expect(subtract(10, 4)).toBe(6);  // 10 - 4
    expect(multiply(45, 2)).toBe(90); // 45 * 2
    expect(divide(20, 5)).toBe(4);    // 20 / 5
  });
});
