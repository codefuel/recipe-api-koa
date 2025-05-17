# Recipe API (Koa + TypeScript)

This is an example API service built with TypeScript and Koa that demonstrates clean application architecture using Domain-Driven Design (DDD). It includes structured request validation using Ajv, interactive API documentation via Swagger, and modular code separation for scalability and testability.

## Features

* Koa for routing and HTTP server setup
* Ajv for request validation and sanitation
* Domain-Driven Design for logical separation of concerns
* Swagger (OpenAPI) for auto-generated API documentation
* Jest for unit testing
* Well-organized, extensible TypeScript project structure

## Project Structure

```
src/
├── commands/       # Command handlers for business operations
├── domain/         # Domain models and business logic
├── infrastructure/ # External services, database connections, etc.
├── presentation/   # HTTP layer (controllers, routes, validators)
└── server.ts       # Application entry point
```

## Prerequisites

* Node Version Manager (nvm)
* Node.js (v18+ recommended)
* npm or yarn

### Installation

```bash
git clone https://github.com/codefuel/recipe-api-koa.git
cd recipe-api-koa
nvm use
npm ci
```

* Edit `config/default.yml` and add the API URL.

## Running the Server

### Development Mode

```bash
npm run start:localdev
```

This will start the server with nodemon for hot reloading.

### Production Mode

```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`.
API documentation can be accessed at `http://localhost:3000/api-docs`.

## Available Scripts

* `npm run build` - Builds the TypeScript code
* `npm run check` - Runs all checks (prettier, lint, build, test)
* `npm run lint` - Runs ESLint
* `npm run lint:fix` - Fixes ESLint issues
* `npm run pretty` - Formats code using Prettier
* `npm test` - Runs all tests
* `npm run test:unit` - Runs unit tests
* `npm run test:integration` - Runs integration tests

## API Documentation

The API is documented using Swagger/OpenAPI. You can view the interactive documentation by:

1. Starting the server
2. Navigating to `http://localhost:3000/api-docs` in your browser

## Architecture

This project follows Domain-Driven Design principles with a clear separation of concerns:

* **Domain Layer**: Contains business logic and domain models
* **Application Layer**: Orchestrates the flow of data and implements use cases
* **Infrastructure Layer**: Handles external concerns like databases and third-party services
* **Presentation Layer**: Manages HTTP requests/responses and API endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.
