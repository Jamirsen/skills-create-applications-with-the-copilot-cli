#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract one number from another
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide one number by another
 * - Modulo (%): Calculate the remainder of division
 * - Exponentiation (^): Raise a number to the power of another
 * - Square Root (sqrt): Calculate the square root of a number
 * 
 * Usage: node calculator.js <operation> <number1> <number2> [number3...]
 * Example: node calculator.js + 5 3
 * Example: node calculator.js ^ 2 8
 * Example: node calculator.js sqrt 16
 */

/**
 * Addition: Sum all numbers
 */
function add(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Subtraction: Subtract subsequent numbers from the first
 */
function subtract(...numbers) {
  return numbers.reduce((acc, num, index) => 
    index === 0 ? num : acc - num
  );
}

/**
 * Multiplication: Multiply all numbers
 */
function multiply(...numbers) {
  return numbers.reduce((acc, num) => acc * num, 1);
}

/**
 * Division: Divide first number by subsequent numbers
 */
function divide(...numbers) {
  if (numbers.slice(1).some(num => num === 0)) {
    throw new Error('Division by zero is not allowed');
  }
  return numbers.reduce((acc, num, index) => 
    index === 0 ? num : acc / num
  );
}

/**
 * Modulo: Calculate the remainder of a divided by b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed');
  }
  return a % b;
}

/**
 * Power: Raise base to the exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Square Root: Calculate the square root of n
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of a negative number');
  }
  return Math.sqrt(n);
}

/**
 * Calculate result based on operation and numbers
 */
function calculate(operation, ...numbers) {
  switch (operation) {
    case '+':
      return add(...numbers);
    case '-':
      return subtract(...numbers);
    case '*':
      return multiply(...numbers);
    case '/':
      return divide(...numbers);
    case '%':
      if (numbers.length !== 2) {
        throw new Error('Modulo operation requires exactly 2 numbers');
      }
      return modulo(numbers[0], numbers[1]);
    case '^':
      if (numbers.length !== 2) {
        throw new Error('Power operation requires exactly 2 numbers');
      }
      return power(numbers[0], numbers[1]);
    case 'sqrt':
      if (numbers.length !== 1) {
        throw new Error('Square root operation requires exactly 1 number');
      }
      return squareRoot(numbers[0]);
    default:
      throw new Error(`Unknown operation '${operation}'`);
  }
}

// Export functions for testing
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };

// CLI interface (only runs when executed directly)
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node calculator.js <operation> <number1> [number2] [number3...]');
    console.log('Operations: +, -, *, /, %, ^, sqrt');
    console.log('Examples:');
    console.log('  node calculator.js + 5 3');
    console.log('  node calculator.js % 10 3');
    console.log('  node calculator.js ^ 2 8');
    console.log('  node calculator.js sqrt 16');
    process.exit(1);
  }

  const operation = args[0];
  const numbers = args.slice(1).map(arg => parseFloat(arg));

  // Validate that all arguments are valid numbers
  if (numbers.some(isNaN)) {
    console.error('Error: All operands must be valid numbers');
    process.exit(1);
  }

  try {
    const result = calculate(operation, ...numbers);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.message.includes('Unknown operation')) {
      console.log('Supported operations: +, -, *, /, %, ^, sqrt');
    }
    process.exit(1);
  }
}
