# GraphQL Example using Angular and Apollo 

This is a simple project built with the Angular CLI and the Apollo client to demonstrate the capabilities of GraphQL.

![image](https://cloud.githubusercontent.com/assets/1544557/22999279/cb3168cc-f397-11e6-8bff-dcf4025476db.png)

## Prerequisites
You will need to have Node.js version >= 6.9 and NPM version >= 3.0 installed. The recommended approach is to use NVM ([Mac/Linux](https://github.com/creationix/nvm), [Windows](https://github.com/coreybutler/nvm-windows)), but you can also get an installer from http://nodejs.org.

## Running the App

To run the client portion of the application, you need to clone the repository and install the dependencies. 

```
git clone https://github.com/onehungrymind/graphql-simple-app.git
cd graphl-simple-app
npm i
npm start
``` 

You will also need to run the server. 

```
cd api
npm i
npm start
```

Once both the server and client are running, you can navigate to [http://localhost:4200](http://localhost:4200) to see the application. Your server will be running on http://localhost:3000.
