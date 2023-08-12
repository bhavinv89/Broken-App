### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  ### Callbacks, Promise, Async/Await, Event Emitter

- What is a Promise?
  ### Promises provide a cleaner way to handle asynchronous code, making it easier to chain operations and handle errors.

- What are the differences between an async function and a regular function?
  ### Regular functions execute synchronously while async functions execute asynchronously.
  ### Async functions can use the await keyword to pause execution, while regular functions can't use await and will block the event loop   if they perform time-consuming operations.

- What is the difference between Node.js and Express.js?
  ### Node.js has Runtime Environment, Use cases and features
  ### Express.js uses Web Application Framework, Routing, Middleware, View Rendering and Extensibility

- What is the error-first callback pattern?
  ###  callback function is passed as an argument to an asynchronous function. This callback is then called when the asynchronous operation completes, either with an error or with the desired result

- What is middleware?
  ### Middleware functions can be used to modify the request and response objects before they reach the final route handler.

- What does the `next` function do?
  ### move the execution flow from one middleware function to the next in a sequence

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc) 
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];

}
/// Revised code from above
async function getUsers() {
  try {
    const [elie, joel, matt] = await Promise.all([
      $.getJSON('https://api.github.com/users/elie'),
      $.getJSON('https://api.github.com/users/joelburton'),
      $.getJSON('https://api.github.com/users/mmmaaatttttt')
    ]);

    return [elie, joel, matt];
  } catch (error) {
    throw new Error('Failed to fetch user data: ' + error.message);
  }
}
```
  ### Parallel Requests: Use Promise.all to fetch data from all users in parallel, improving performance by reducing waiting time.
  ### Error Handling: Added a try...catch block to handle errors that might occur during the API requests.
  ### Code Duplication: The code is more concise and eliminates repetition by using Promise.all.
