 # Todo App - Frontend
 
 This is the frontend service for the Todo application.
 
 ## 🚀 Deployment on Railway
 
 This project is configured for easy deployment on [Railway](https://railway.app/). The deployment configuration is defined in the `railway.toml` file.
 
 ### Build Configuration
 
 The `[build]` section of `railway.toml` specifies how the application is built:
 
 -   **Builder**: `dockerfile`
 -   **Dockerfile Path**: The build process uses the `Dockerfile` located in the root of the project (`.`).
 
 This means Railway will build a Docker image from the `Dockerfile` to run the application.
 
 ### Deploy Configuration
 
 The `[deploy]` section controls how the built application is run and managed by Railway:
 
 -   **`startCommand`**: This is empty, which implies that the `CMD` or `ENTRYPOINT` instruction within the `Dockerfile` is used to start the web server.
 -   **`healthcheckPath`**: Railway will check the `/index.html` endpoint to ensure the service is running correctly.
 -   **`healthcheckTimeout`**: The health check will wait up to 120 seconds for a successful response.
 -   **`restartPolicyType`**: The service is set to `ON_FAILURE`. If it crashes, Railway will attempt to restart it.
 -   **`restartPolicyMaxRetries`**: Railway will try to restart the service up to 3 times before marking it as crashed.
 
 ## 💻 Local Development
 
 To run this project locally, you will likely need to:
 
 1.  **Install Dependencies**:
     ```bash
     npm install
     ```
 
 2.  **Run the Development Server**:
     ```bash
     npm run dev
     ```
     *(Note: This command might be `npm start` depending on the project setup).*
 
 3.  **Build for Production**:
     To create a production-ready build (which is what the `Dockerfile` likely does), run:
     ```bash
     npm run build
     ```
