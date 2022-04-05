# Conexa backend challenge

## Manual Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/GermanTorales/conexa-back

cd conexa-back
```

Install the dependencies:

```bash
yarn
```

Set the environment variables:

```bash
# Copy the .env.example on .env
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Conexa backend challenge](#conexa-backend-challenge)
  - [Manual Installation](#manual-installation)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Commands](#commands)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
    - [API Endpoints](#api-endpoints)
  - [Error Handling](#error-handling)
  - [Validation](#validation)
  - [Logging](#logging)
  - [Linting](#linting)

## Features

- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [yarn](https://github.com/yarnpkg/yarn#readme)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
yarn run dev
```

Running in production:

```bash
yarn start
```

Build with babel

```bash
yarn run build
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
###################
## SERVER CONFIG ##
###################
PORT=3000
NODE_ENV=local

################
## JWT CONFIG ##
################
JWT_SECRET=secretexample
JWT_ACCESS_EXPIRATION_MINUTES=1


###########################
## JSON PLACE HOLDER URL ##
###########################
JSON_PLACEHOLDER_URL=http://jsonplaceholder.typicode.com
```

## Project Structure

```
|--src\
    |--app\               # Application
    |--config\            # Environment variables and configuration related things
    |--constants          # Centralization of constant variables and numbered lists of content
    |--controllers\       # Route controllers (controller layer)
    |--middlewares\       # Custom express middlewares
    |--mock\              # Mock data
    |--routes\            # Defining the routes
    |--services\          # Business logic (service layer)
    |--utils\             # Utility classes and functions
    |--validations\       # Validations schemas
    |--www                # App entry point
```

### API Endpoints

List of available routes:

**Health routes**:\
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/users/login | User login
| GET | /api/v1/jsonplaceholder/posts | List posts |
| GET | /api/v1/jsonplaceholder/photos | List photos |

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).
The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere.

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in anywhere.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
import logger from '<path to src>/config/logger';

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Standard JavaScript style guide](https://standardjs.com/) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.yml` file. To modify the Prettier configuration, update the `.prettierrc` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.
