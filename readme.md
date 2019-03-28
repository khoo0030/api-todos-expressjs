## Table of Contents
- [Todos App in ExpressJS](#todos-app-in-expressjs)

- [Getting Started using Docker](#getting-started-using-docker)
    * [Prerequisites](#prerequisites)
    * [Clone With Git](#clone-with-git)
    * [Start Docker Containers](#start-docker-containers)
    * [Setup Migrations](#setup-migrations)
- [Schema](#schema)
- [Endpoints](#endpoints)
- [Running Tests](#running-tests)


## Todos App in ExpressJS
Simple project to create a todo app in express.

Work in progress. This projects serves as an example to:
- Build a REST API in NodeJS, specifically ExpressJS with the following:
    - MySQL as database
    - Sequelize ORM to work with MySQL
- Test driven development mindset:
    - Working with Mocha and Chai test framework
- Build in an Dockerized environment

Future works may include:
- More refactoring works
- To introduce Repository Pattern
- To introduce Factories Pattern

## Getting Started using Docker

Quickstart guide to getting Docker-based dev environment up and running.

### Prerequisites

You need Docker installed. Use native version for your OS - use Toolbox only as last resort.
- Docker for Windows (preferred)
- Docker for Mac (preferred)
- Docker Toolbox

To run .sh scripts in a Windows environment, use Git Bash.

### Clone With Git

Do this step if you're starting fresh.

```
git clone https://github.com/khoo0030/api-todos-expressjs.git
```

### Install Npm Dependencies

cd into the project root folder and run:

```
npm install
```

### Start Docker Containers
There are 4 services in the docker compose file

| Services | App | Exposed Port | Remarks |
| --- | --- | --- | --- |
| web | Nginx | 8080| Access on http://localhost:8080 |
| app | ExpressJS | | |
| pma | PhpMyAdmin | 3001 | Access on http://localhost:3001 |
| db | MySql | | |

Run docker compose

cd into the project root folder and run:

```
docker-compose up -d
```

### Setup Migrations

Bash into the app container, 

```
docker-compose exec app /bin/bash
```

Run following to migrate database 

```
node_modules/.bin/sequelize db:migrate
```

## Schema

todo table

| Column | Type | 
| --- | --- | 
| id | Primary key | 
| title | varchar | 
| created_at | timestamp | 
| updated_at | timestamp | 

## Endpoints

| Http verb | Path | Description | 
| --- | --- | --- | 
| POST | /api/v1/todos | Create a todo record | 
| GET | /api/v1/todos | Get all todo records | 
| GET | /api/v1/todos/{id} | Get a todo record | 
| PUT | /api/v1/todos/{id} | Update a todo record | 
| DELETE | /api/v1/todos/{id} | Delete a todo record | 

## Running Tests

This project has tests setup. Database and migrations must be setup before running tests. 

Bash into the app container and run:

```
docker-compose exec app /bin/bash
```

Run following to run tests

```
npm run test
```
