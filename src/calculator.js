#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract one number from another
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide one number by another
 * 
 * Usage: node calculator.js <operation> <number1> <number2> [number3...]
 * Example: node calculator.js + 5 3
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
    default:
      throw new Error(`Unknown operation '${operation}'`);
  }
}

// Export functions for testing
module.exports = { add, subtract, multiply, divide, calculate };

// CLI interface (only runs when executed directly)
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: node calculator.js <operation> <number1> <number2> [number3...]');
    console.log('Operations: +, -, *, /');
    console.log('Example: node calculator.js + 5 3');
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
      console.log('Supported operations: +, -, *, /');
    }
    process.exit(1);
  }
}
