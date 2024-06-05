# Sprint4- Restful API -CRUD
In sprint 4, the main objective is to Build an Express application with CRUD API Gateway endpoint functionality for the web crawler to read/write/delete/update the list of website/webpages to crawl. 

The Restfull API(that follow a certain set of rules) used http protocole. HTTP protocole is basically a protocole to transfer data on the web. it is the statesless protocole(means when we send the request, it constians all the necassary information in the request.) 


# This project is divided into different parts:
1-Crud operation on express server with api gateway

2-Read/write on MongoDB database

3-Create/delete alarm when URL added or deleted

4-Full functionality of CI/CD on AWS.


# Resources used:
## Github: 
github repository is used as a source of code for our project

## AWS Codepipeline: 
high-level construct library that makes it easy to set up a continuous deployment pipeline for your CDK applications, powered by AWS CodePipeline

## AWS Cloudwatch: 
Collect, monitoring and operational data in form of logs, events, metrics and visualizes it using automated dashboad.

## AWS Codebuild: 
fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.

## AWS Codedeploy: 
Fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers.

## AWS Lambda: 
serverless compute service that runs your code in response to events and automatically manages the underlying compute resources

## AWS DynamoDB: 
Fully managed proprietary NoSQL database service that supports key–value and document data structures


## Useful commands

* `npm install mongodb`                     for mongodb
* `npm install axios`                     for axios
* `npm i source-map-support`                for support 
* `npm install @vendia/serverless-express`  for serverless express 
* `npm i --save-dev@types/node`             to fix the issue -require module not found
* `npm install body-parser`                 to convert the request into json formate
* `npm install express`                     to install express package
* `cdk init --language typescript`    to setup typescript enviroment
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
