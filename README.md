YED WAHDA - Fundraising Application
Description
YED WAHDA is an innovative fundraising platform that integrates two different backend technologies:

Backend 1: Spring Boot.
Backend 2: Node.js with MongoDB.
Both backends share the same React frontend, providing a seamless and intuitive user experience.

Project Structure
Collect_de_fond_React/: React frontend (shared by both backends).
collect_de_fond_SpringBoot/: Spring Boot backend.
Collect_de_fond_React/Back-end/: Node.js backend.
Conception/: Design documents.
Prerequisites
Before starting, ensure you have the following installed:

Node.js (for the React frontend and Node.js backend).
Java JDK 17+ (for the Spring Boot backend).
Maven (to build the Spring Boot backend).
MongoDB (for the Node.js backend).
Git (to clone the project).
Installation and Startup
1. Clone the Repository
Clone the project to your local environment:

bash
Copy
Edit
git clone <REPOSITORY_URL>
cd YED_WA7DA
2. Start the React Frontend
Navigate to the frontend folder:
bash
Copy
Edit
cd Collect_de_fond_React
Install dependencies:
bash
Copy
Edit
npm install
Start the development server:
bash
Copy
Edit
npm start
The application will be available at http://localhost:3000.
3. Start a Backend
Option 1: Spring Boot Backend
Navigate to the Spring Boot folder:
bash
Copy
Edit
cd collect_de_fond_SpringBoot/collectdefond
Build and run the server:
bash
Copy
Edit
mvn spring-boot:run
The API will be available at http://localhost:8080.
Option 2: Node.js Backend
Navigate to the Node.js backend folder:
bash
Copy
Edit
cd Collect_de_fond_React/Back-end
Install dependencies:
bash
Copy
Edit
npm install
Start the server:
bash
Copy
Edit
node server.js
The API will be available at http://localhost:5000.
Database Configuration
MongoDB (Node.js Backend)
Ensure MongoDB is running locally.
Update the mongodb_connection.js file with your connection URI:
javascript
Copy
Edit
const dbURI = "mongodb://localhost:27017/YED";
