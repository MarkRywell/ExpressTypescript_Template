# Express Typescript Backend Template

Express & TypeScript Backend Template
This project provides a boilerplate for building backend applications using Node.js, Express.js, and MySQL with TypeScript for type safety and improved maintainability.

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
  
* src/schemas: This folder might contain MySQL schemas (Using Sequelize for MySQL Interaction).
  
* src/routes: This directory houses route definitions that map incoming API requests to specific controller functions. Routes define the API endpoints and how they are handled.

### Developer Notes
* This Backend Template with MySQL as Database has preconfigured unit tests
* 

### Tech Stack
* NodeJS Typescript
* ExpressJS Backend Framework
* MySQL Database

### Dependencies
* NodeJS (LTS) / NodeJS v19
* TypeScript
* ExpressJS
* MySQL Database

### Software Applications 
* **XAMPP** - Provides a local web server environment for testing and development
* Postman - API Testing (https://www.postman.com/downloads/)


### Global Dependencies
* PM2 (https://pm2.keymetrics.io/)


### Setup

#### Initial Setup

#### 1. Run XAMPP Control Panel and start Apache and MySQL module

#### Project Setup

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

### License
This project is provided under the [MIT License](./LICENSE)