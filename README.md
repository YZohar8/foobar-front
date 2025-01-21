# FacebookASP-WebApp-FE

Welcome to the FacebookASP-WebApp!
This is the Web component of a social network project, designed using React to deliver a dynamic and interactive user interface.

## About the Project
This project serves as the frontend for a Facebook-like social media application. Our goal was to create a platform for seamless interaction while providing a polished and user-friendly experience. The React framework was utilized to break down the interface into reusable components, efficiently manage states, and render content dynamically.

### Development Journey
- **Initial Setup:** Started with basic HTML and CSS for static designs.
- **Transition to React:** Adopted React to develop dynamic features and component-based architecture.
- **Refinements:** Focused on improving the design, functionality, and user experience through extensive refactoring and testing.

This WebApp is a part of the larger FacebookASP system, offering a responsive and visually appealing frontend for users to interact with the platform. Note that this project does not include an internal database; it communicates with a backend server running on port `8080`.

The backend server repository can be found here: [FacebookASP Server](https://github.com/YZohar8/foobar-server.git).

When running the server, it automatically serves this application as well, providing a seamless integration.

## Features
- **Sign Up & Login:** Create an account or log in to access the application.
- **Newsfeed:** View posts from friends, share updates, and manage your own posts (edit/delete).
- **Profile:** Explore user profiles, check connections, and more.

## Prerequisites
Before starting, ensure the following tools are installed on your machine:

- **Node.js**
- **npm**

### Install Node.js and npm (Linux Example):
```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

## Installation
To run the WebApp locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/YZohar8/foobar-front.git
   cd foobar-front
   git checkout part_3_final
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
Start the development server with the following command:

```bash
npm start
```

The app will attempt to run on [http://localhost:3000](http://localhost:3000).
If port `3000` is unavailable, you will be prompted to use a different port.

## Running the Backend Server
To run the backend server that supports this frontend application:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/YZohar8/foobar-server.git
   ```
   how to run the server as explain in server readme file.

2. Follow the backend's instructions to install dependencies and start the server. By default, it runs on port `8080` and serves this application automatically.

## Starting Guide
Once the application is running, it is initialized with sample posts and users.
We recommend logging in with the following credentials for testing:

- **Email:** example@example.com
- **Password:** password123

## Live Deployment
You can also access the live version of the FacebookASP WebApp hosted in the cloud. This deployment showcases the most recent version of the app with real-time functionality.

Enjoy exploring the FacebookASP-WebApp!
We look forward to your feedback and suggestions to make it even better.
