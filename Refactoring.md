# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The refactoring process focused on these aspects:
1. Rename the variables for better understanding. 
   1. Variable `candidate`, `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` to `partitionKey`, `PARTITION_KEY_DEFAULT` and `PARTITION_KEY_MAX_LENGTH`. 
2. Understand how the method works.
3. Create tests for each case.
4. Move the validation (`if/else`) blocks close to the positions where they are needed.
   1. The `(typeof partitionKey !== "string")` validation is only used if the `event.partitionKey` expression is true. 
   2. It is the same situation with block `partitionKey.length > PARTITION_KEY_MAX_LENGTH`, since the `event.partitionKey` may be too long.

This solution is one of many possible solutions, but I find this the easiest to read and follow and therefore easy to debug.
The reason is that each validation and operation is located close to the case that needs it, making each block self-contained. 
This approach is very beneficial if we later want to create another method or function from a particular block.

