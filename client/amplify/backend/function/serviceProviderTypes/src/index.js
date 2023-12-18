import awsServerlessExpress from 'aws-serverless-express';
import app from './app.js';

// Create an Express.js server
const server = awsServerlessExpress.createServer(app);

// AWS Lambda handler
export const handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
