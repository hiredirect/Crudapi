// For redirecting requests to the Express Application
const ServerlessExpress = require('@vendia/serverless-express');
import {app} from './server';
exports.lambda_handler = ServerlessExpress({app});
