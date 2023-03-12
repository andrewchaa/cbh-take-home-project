# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Used constants wherever possible to replace magic strings to avoid misspelling and to clarify the meaning.
2. Extracted a condition, `candidate.length > MAX_PARTITION_KEY_LENGTH` as a variable to reveal the intention of the code
3. Used early returns to improve the readability of the code. Nested if else statements often make the logic of the code unnecessarily complex.
4. Extracted part of the code into a function, `getCandidateFrom` to clarify what it does.
5. Replaced `let` with `const` to make the `candidate` variable immutable. Mutability often causes an unintended behaviour and can be a source of bugs.

