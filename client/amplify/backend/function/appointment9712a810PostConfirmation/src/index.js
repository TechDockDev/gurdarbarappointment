// /**
//  * @fileoverview
//  *
//  * This CloudFormation Trigger creates a handler which awaits the other handlers
//  * specified in the `MODULES` env var, located at `./${MODULE}`.
//  */

// /**
//  * The names of modules to load are stored as a comma-delimited string in the
//  * `MODULES` env var.
//  */
// const moduleNames = process.env.MODULES.split(',');
// /**
//  * The array of imported modules.
//  */
// const modules = moduleNames.map((name) => require(`./${name}`));

// /**
//  * This async handler iterates over the given modules and awaits them.
//  *
//  * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  *
//  */
// exports.handler = async (event, context) => {
//   /**
//    * Instead of naively iterating over all handlers, run them concurrently with
//    * `await Promise.all(...)`. This would otherwise just be determined by the
//    * order of names in the `MODULES` var.
//    */
//   await Promise.all(modules.map((module) => module.handler(event, context)));
//   return event;
// };

// The names of modules to load are stored as a comma-delimited string in the
// `MODULES` environment variable.
const moduleNames = process.env.MODULES.split(',');

// Import the modules as an array of promises.
const modules = moduleNames.map(async (name) => import(`./${name}.js`));

// This async handler iterates over the imported modules and awaits them.
export const handler = async (event, context) => {
  try {
    // Use Promise.allSettled to await all module imports concurrently.
    const moduleImports = await Promise.allSettled(modules);

    // Iterate through the module imports and invoke their handlers.
    const moduleHandlers = moduleImports
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value.handler(event, context));

    // Await all module handlers concurrently.
    await Promise.all(moduleHandlers);

    return event;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling at the outer level.
  }
};
