# Express Typescript Backend Template

Express & TypeScript Backend Template
This project provides a boilerplate for building backend applications using Node.js, Express.js, and MongoDB with TypeScript for type safety and improved maintainability.

The template includes pre-configured dependencies, a basic project structure following the MVC design pattern (Model-View-Controller), and scripts for development and production builds.

### Key Features:

User Authentication: Implements user registration, login, and refresh token functionality using JSON Web Tokens (JWT) for secure authentication.
Password Encryption: Employs bcrypt for secure password hashing and storage.
MVC Design Pattern: Follows the industry-standard MVC pattern for organizing code and promoting separation of concerns.

### Project Structure

The project adheres to a well-organized structure using folders to segregate different functionalities:

* src: This directory contains the application's core source code.

* src/models: This folder houses files representing your data models. These files typically define the structure and types of your application's data entities (e.g., User, Address).
  
* src/controllers: This directory stores the logic for handling incoming requests and interacting with models and services. Controller functions handle user interactions and business logic.
  
* src/schemas: This folder might contain Mongoose schemas (Using Mongoose for MongoDB interaction).
  
* src/routes: This directory houses route definitions that map incoming API requests to specific controller functions. Routes define the API endpoints and how they are handled.

### Tech Stack
* NodeJS Typescript
* ExpressJS Backend Framework
* MongoDB NoSQL Database

### Dependencies
* NodeJS (LTS) / NodeJS v19
* TypeScript
* ExpressJS
* Jest Unit Testing


### Software Applications (optional)
* MongoDB Compass - GUI for MongoDB data Visual environment
* Insomnia/Postman - API Testing

### Global Dependencies
* PM2 (https://pm2.keymetrics.io/)

### Setup

##### Clone the repository
```bash
# Clone the repository with HTTPS
git clone https://github.com/MarkRywell/ExpressTypescript_Template.git
```

#### Navigate to the project directory
```bash
# Change directory
cd ExpressTypescript_Template
```

#### Installing the dependencies
```bash
npm install
```

#### Install global dependencies (Optional)
```bash
npm install pm2 -g
```

#### Create environment variables
```bash
cp .env.example .env
```

### Running
```bash
# running with nodemon
npm run dev
```

```bash
# build typescript into javascript and run
npm run build:dev
```

```bash
# running with pm2
pm2 start
```

```bash
# stop pm2 process with id 0
pm2 stop 0
```
