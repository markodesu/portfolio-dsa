// components/DataStructures/Stack.jsx
import { useState } from 'react';

export default function Stack() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [operation, setOperation] = useState('');
  const [infixExpression, setInfixExpression] = useState('');
  const [postfixExpression, setPostfixExpression] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');
  const [showPolishNotation, setShowPolishNotation] = useState(false);
  const [conversionMode, setConversionMode] = useState('infix-to-postfix'); // 'infix-to-postfix' or 'postfix-to-infix'

  const isOperator = (char) => {
    return ['+', '-', '*', '/', '^'].includes(char);
  };

  const getPrecedence = (operator) => {
    switch (operator) {
      case '^': return 3;
      case '*':
      case '/': return 2;
      case '+':
      case '-': return 1;
      default: return 0;
    }
  };

  const infixToPostfix = async (infix) => {
    let postfix = '';
    const operatorStack = [];
    setAnimationStep(0);
    setOperation('Starting conversion...');

    for (let i = 0; i < infix.length; i++) {
      const char = infix[i];
      setOperation(`Processing character: ${char}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (char === ' ') continue;

      if (char === '(') {
        operatorStack.push(char);
        setOperation(`Pushing '(' to operator stack`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else if (char === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          postfix += operatorStack.pop() + ' ';
          setOperation(`Popping operator from stack: ${postfix}`);
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
          operatorStack.pop();
        }
      } else if (isOperator(char)) {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(char)
        ) {
          postfix += operatorStack.pop() + ' ';
          setOperation(`Popping higher precedence operator: ${postfix}`);
          setAnimationStep(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        operatorStack.push(char);
        setOperation(`Pushing operator to stack: ${char}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        let operand = '';
        while (i < infix.length && /[0-9.]/.test(infix[i])) {
          operand += infix[i];
          i++;
        }
        i--;
        postfix += operand + ' ';
        setOperation(`Adding operand to postfix: ${operand}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    while (operatorStack.length > 0) {
      postfix += operatorStack.pop() + ' ';
      setOperation(`Popping remaining operators: ${postfix}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return postfix.trim();
  };

  const evaluatePostfix = async (postfix) => {
    const stack = [];
    setAnimationStep(0);
    setOperation('Starting evaluation...');

    const tokens = postfix.split(' ').filter(token => token !== '');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      setOperation(`Processing token: ${token}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isOperator(token)) {
        const b = stack.pop();
        const a = stack.pop();
        let result;

        switch (token) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = a / b; break;
          case '^': result = Math.pow(a, b); break;
          default: result = 0;
        }

        stack.push(result);
        setOperation(`Performing operation: ${a} ${token} ${b} = ${result}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        stack.push(parseFloat(token));
        setOperation(`Pushing operand: ${token}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return stack[0];
  };

  const postfixToInfix = async (postfix) => {
    const stack = [];
    setAnimationStep(0);
    setOperation('Starting conversion...');

    const tokens = postfix.split(' ').filter(token => token !== '');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      setOperation(`Processing token: ${token}`);
      setAnimationStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isOperator(token)) {
        if (stack.length < 2) {
          throw new Error('Invalid postfix expression');
        }
        const b = stack.pop();
        const a = stack.pop();
        const expression = `(${a} ${token} ${b})`;
        stack.push(expression);
        setOperation(`Combining expressions: ${expression}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        stack.push(token);
        setOperation(`Pushing operand: ${token}`);
        setAnimationStep(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (stack.length !== 1) {
      throw new Error('Invalid postfix expression');
    }

    return stack[0];
  };

  const handlePolishNotation = async () => {
    if (conversionMode === 'infix-to-postfix') {
      if (!infixExpression) {
        setError('Please enter an infix expression');
        return;
      }

      setError('');
      setPostfixExpression('');
      setEvaluationResult('');

      try {
        const postfix = await infixToPostfix(infixExpression);
        setPostfixExpression(postfix);
        const result = await evaluatePostfix(postfix);
        setEvaluationResult(result);
      } catch (err) {
        setError('Invalid expression');
      }
    } else {
      if (!postfixExpression) {
        setError('Please enter a postfix expression');
        return;
      }

      setError('');
      setInfixExpression('');
      setEvaluationResult('');

      try {
        const infix = await postfixToInfix(postfixExpression);
        setInfixExpression(infix);
        const result = await evaluatePostfix(postfixExpression);
        setEvaluationResult(result);
      } catch (err) {
        setError('Invalid postfix expression');
      }
    }
  };

  const push = () => {
    if (!inputValue) {
      setError('Please enter a value');
      return;
    }

    setError('');
    setOperation('Pushing element...');
    setAnimationStep(0);
    setHighlightedIndex(stack.length);

    setTimeout(() => {
      setStack([...stack, inputValue]);
      setInputValue('');
      setOperation('Push complete!');
    }, 1000);
  };

  const pop = () => {
    if (stack.length === 0) {
      setError('Stack is empty');
      return;
    }

    setError('');
    setOperation('Popping element...');
    setAnimationStep(0);
    setHighlightedIndex(stack.length - 1);

    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setOperation('Pop complete!');
    }, 1000);
  };

  const peek = () => {
    if (stack.length === 0) {
      setError('Stack is empty');
      return;
    }

    setError('');
    setOperation(`Peek: ${stack[stack.length - 1]}`);
    setAnimationStep(0);
    setHighlightedIndex(stack.length - 1);
  };

  const isEmpty = () => {
    setError('');
    setOperation(`Is Empty: ${stack.length === 0}`);
    setAnimationStep(0);
    setHighlightedIndex(null);
  };

  const size = () => {
    setError('');
    setOperation(`Size: ${stack.length}`);
    setAnimationStep(0);
    setHighlightedIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => setIsDefinitionOpen(!isDefinitionOpen)}
          className="w-full text-left bg-pink-100 p-4 rounded-lg hover:bg-pink-200 transition-colors"
        >
          <h2 className="text-xl font-semibold text-pink-800 flex justify-between items-center">
            Stack Definition
            <span className="text-pink-600">{isDefinitionOpen ? '▼' : '▶'}</span>
          </h2>
        </button>
        {isDefinitionOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-pink-700 mb-2">What is a Stack?</h3>
            <p className="text-gray-700 mb-4">
              A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
              Elements are added and removed from the same end, called the top of the stack.
            </p>
            
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Key Operations:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Push: Adds an element to the top of the stack</li>
              <li>Pop: Removes and returns the top element</li>
              <li>Peek: Returns the top element without removing it</li>
              <li>IsEmpty: Checks if the stack is empty</li>
              <li>Size: Returns the number of elements in the stack</li>
            </ul>

            <h3 className="text-lg font-semibold text-pink-700 mt-4 mb-2">Applications:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Function call management</li>
              <li>Expression evaluation</li>
              <li>Undo operations</li>
              <li>Browser history</li>
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Basic Stack Operations */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Stack Operations</h2>
          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded mb-4" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="stackValue" className="block text-sm font-medium text-pink-700 mb-1">
                Value
              </label>
              <div className="flex gap-2">
                <input
                  id="stackValue"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a value"
                  className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  onClick={push}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                >
                  Push
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={pop}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Pop
              </button>
              <button
                onClick={peek}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Peek
              </button>
              <button
                onClick={isEmpty}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Is Empty
              </button>
              <button
                onClick={size}
                className="flex-1 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
              >
                Size
              </button>
            </div>
          </div>
        </div>

        {/* Polish Notation Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-pink-600">Polish Notation</h2>
            <button
              onClick={() => setShowPolishNotation(!showPolishNotation)}
              className="text-pink-600 hover:text-pink-700"
            >
              {showPolishNotation ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showPolishNotation && (
            <div className="space-y-4">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setConversionMode('infix-to-postfix')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    conversionMode === 'infix-to-postfix'
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  Infix to Postfix
                </button>
                <button
                  onClick={() => setConversionMode('postfix-to-infix')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    conversionMode === 'postfix-to-infix'
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  Postfix to Infix
                </button>
              </div>

              {conversionMode === 'infix-to-postfix' ? (
                <div>
                  <label htmlFor="infixExpression" className="block text-sm font-medium text-pink-700 mb-1">
                    Infix Expression
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="infixExpression"
                      type="text"
                      value={infixExpression}
                      onChange={(e) => setInfixExpression(e.target.value)}
                      placeholder="Enter infix expression (e.g., 3 + 4 * 2)"
                      className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      onClick={handlePolishNotation}
                      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                    >
                      Convert & Evaluate
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="postfixExpression" className="block text-sm font-medium text-pink-700 mb-1">
                    Postfix Expression
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="postfixExpression"
                      type="text"
                      value={postfixExpression}
                      onChange={(e) => setPostfixExpression(e.target.value)}
                      placeholder="Enter postfix expression (e.g., 3 4 2 * +)"
                      className="flex-1 p-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      onClick={handlePolishNotation}
                      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                    >
                      Convert & Evaluate
                    </button>
                  </div>
                </div>
              )}

              {conversionMode === 'infix-to-postfix' && postfixExpression && (
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">Postfix Expression:</h3>
                  <p className="text-gray-700 font-mono">{postfixExpression}</p>
                </div>
              )}

              {conversionMode === 'postfix-to-infix' && infixExpression && (
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">Infix Expression:</h3>
                  <p className="text-gray-700 font-mono">{infixExpression}</p>
                </div>
              )}

              {evaluationResult !== '' && (
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">Evaluation Result:</h3>
                  <p className="text-gray-700 font-mono">{evaluationResult}</p>
                </div>
              )}

              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Instructions:</h3>
                {conversionMode === 'infix-to-postfix' ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Enter an infix expression using numbers and operators (+, -, *, /, ^)</li>
                    <li>Use spaces between numbers and operators</li>
                    <li>You can use parentheses for grouping</li>
                    <li>Example: "3 + 4 * 2" or "(1 + 2) * 3"</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Enter a postfix expression using numbers and operators (+, -, *, /, ^)</li>
                    <li>Use spaces between all tokens (numbers and operators)</li>
                    <li>Example: "3 4 2 * +" (equivalent to "3 + 4 * 2")</li>
                    <li>Make sure the expression is valid postfix notation</li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Visualization section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Visualization</h2>
          <div className="relative h-[400px] bg-gradient-to-b from-pink-50 to-white rounded-lg">
            <div className="absolute top-4 left-4 text-pink-600 font-semibold">
              Step {animationStep + 1}
            </div>
            <div className="absolute top-4 right-4 text-pink-600 font-medium">
              {operation}
            </div>
            <div className="flex flex-col-reverse items-center h-full p-8">
              {stack.map((item, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 flex items-center justify-center text-2xl font-bold text-white transition-all duration-500 ${
                    highlightedIndex === index
                      ? 'bg-pink-600 transform scale-110'
                      : 'bg-pink-400'
                  }`}
                  style={{
                    marginBottom: index === stack.length - 1 ? '0' : '1rem',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
