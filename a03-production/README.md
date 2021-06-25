# A03 Production

## How to run

1. 'npm install' to install all dependencies
2. 'npm start' to start application

## About the Application

1. The application can be run locally on 'http://localhost:5001'. The URL to my application on production server is; 'https://cscloud8-91.lnu.se/a03-production'

2. The application was made secure by using Nginx which enables reverse proxy in my application. Setting up proxy to run on HTTPS. Ensuring that changes in issues go through webhooks contains the secret token i.e 'secret' in GitHubWebhook function syntax.

3. Different parts of my Application:
   <br>

- Reversed Proxy: Nginx can be used as reversed proxy which directs all traffic from port 443 to port 5001. This also handles TLS encryption between client and server.

- Process manager: I have installed PM2 to ensure that my application keeps running and the PM2 starts again in case my application crashes.

- TLS certificates: To secure data by encrypting it between client and server, we use TLS certificates.

- Environment variables: They tell an application on how to run in a certain environment or provide other information about the environment.

<br>

4. When running my application in development, I could use debugging to find errors and perform reloading to application after building/making changes. The production on the other hand, can be used for testing application's performance as well as in catching bugs that only show up in production.

5. Apart from the github-webhooks and express, I used socket.io to get real time data between server-side and client-side connection. It is much faster that normal API calls done over the network using HTTP. I think these libraries are contantly updated to newer version to fix bugs so, is is must be secure for communication.

6. I have implemented all the required features and no extra features were added.

7. I am satisfied with my application as I believe I implemented all the required tasks. The application has a simple layered architecture which is easy to follow. The server.js in the entry point to the application which calls the app.js and controller.js files.

8. The TIL for this course part would be learning how to implement Webhooks and using tokens from Github. Using socket.io for secure communication between client and server. The main challenge was deploying application on production server because the webhooks were unable display notifications on production when changes were made to github issues. However, when I ran the application using ngrok, it worked perfeclty fine without errors.
   Another interesting part was learning about Nginx for configuring reversed proxy. I also learnt about PM2 and how to secure application on real server using TLS cesrtificates.

