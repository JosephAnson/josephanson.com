---
title: Handling Try-Catch in API Endpoints with the Result Pattern
description: Learn how to use the Result pattern to handle try-catch in API endpoints, providing a more elegant and scalable solution.
date: 2024-02-26T00:00:00.000Z
categories:
  - API Development
  - TypeScript
tags:
  - Result Pattern
  - API Endpoints
  - Error Handling
  - Try-catch
  - TypeScript
---

When building API endpoints, handling errors and exceptions is a crucial aspect of ensuring a robust and maintainable application. One common approach is to use try-catch blocks to catch and handle errors. However, this approach can lead to cluttered code and make it difficult to handle errors consistently across the application. In this post, we'll explore how to use the Result pattern to handle try-catch in API endpoints, providing a more elegant and scalable solution.

## What is the Result Pattern?

The Result pattern is a software design pattern that returns an object containing the outcome of an operation, along with any data it returned. This pattern allows for a more explicit and consistent way of handling errors and exceptions, making code more robust and maintainable.

## Implementing the Result Pattern in API Endpoints

Here's an example of how to implement the Result pattern in an API endpoint using TypeScript:

```typescript
export type ApiError = 'InvalidJson' | 'RequestFailed' | 'NetworkError'

export type Result<T, E extends ApiError>
  = | { ok: true, data: T }
    | { ok: false, error: E }

async function getResult<T>(
  apiCall: () => Promise<Response>
): Promise<Result<T, ApiError>> {
  try {
    const response = await apiCall()
    if (!response.ok)
      throw new Error('Not OK!')
    try {
      const data = await response.json()
      return { ok: true, data }
    }
    catch (jsonError) {
      return { ok: false, error: 'InvalidJson' }
    }
  }
  catch (error) {
    return { ok: false, error: 'RequestFailed' }
  }
}
```

In this example, the `getResult` function returns a `Result` object, the result is a discriminated union the discriminator key `ok` that can be used to safely check if the api call was successful.

## Handling Errors with the Result Pattern

```ts
interface Todo {
  title: string
}

async function getTodo(id: number) {
  const result = await getResult<Todo>(() => fetch(`https://api.example.com/todos/${id}`))

  if (result.ok) {
    console.log(`Todo: ${result.data.title}`)
  }
  else {
    // Handle specific errors
    switch (result.error) {
      case 'InvalidJson':
        console.error('Error parsing JSON response')
        break
      case 'RequestFailed':
        console.error('API request failed')
        break
      default:
        console.error('Unknown error')
    }
  }
}
```

The `getResult` function uses the Result pattern to handle errors in a consistent and explicit way. Using the `ok` property we're able to get type safety access to the data or error property. This means for each api call if we want to access the `data` property we first need to check if the `result` has the `ok` property set to `true`

## Benefits of the Result Pattern

The Result pattern provides a powerful and flexible way to handle try-catch in API endpoints, making it easier to write robust and maintainable code. By using the Result pattern, you can:

- Separate error handling logic from the main code flow, making it easier to read and understand
- Handle different types of errors and exceptions in a flexible and scalable way
- Write more robust and maintainable code

## Conclusion

In this post, we've explored how to use the Result pattern to handle try-catch in API endpoints. By using the Result pattern, you can write more robust and maintainable code that is easier to read and understand. Remember to separate error handling logic from the main code flow and handle different types of errors and exceptions in a flexible and scalable way.
