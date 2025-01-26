# YED WAHDA - Crowdfunding Platform

## Overview
YED WAHDA is a modern crowdfunding platform designed to connect fundraisers with donors. The project implements a unique dual-backend architecture, offering flexibility and scalability in deployment options.

## Key Features
- User authentication and authorization
- Campaign creation and management
- Secure donation processing
- Campaign discovery and search
- User dashboard and profile management
- Real-time campaign updates
- Responsive design for all devices

## Technical Architecture
The project is built using a modern tech stack:

### Frontend
- React.js for the user interface
- Material-UI/Bootstrap for styling
- Redux for state management
- Axios for API communication

### Backend Options
1. **Spring Boot Backend**
   - Java 17+
   - Spring Boot framework
   - RESTful API architecture
   - JPA/Hibernate for data persistence
   - MySQL database

2. **Node.js Backend**
   - Node.js runtime
   - Express.js framework
   - MongoDB database
   - Mongoose ODM
   - RESTful API architecture

## Project Structure
```
├── Collect_de_fond_React/     # Main React frontend
│   ├── frontend/             # React application
│   └── Back-end/            # Node.js backend
│
├── collect_de_fond_SpringBoot/ # Spring Boot backend
│   ├── collectdefond/       # Spring Boot application
│   └── frontend/            # React build files
│
└── Conception/              # Design documents and diagrams
```

## Prerequisites
- Node.js (v14 or higher)
- Java JDK 17 or higher
- Maven 3.6+
- MongoDB (for Node.js backend)
- MySQL (for Spring Boot backend)
- Git

## Installation and Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd YED_WA7DA
```

### 2. Frontend Setup
```bash
cd Collect_de_fond_React/frontend
npm install
npm start
```
The frontend will be available at `http://localhost:3000`

### 3. Backend Setup (Choose One)

#### Option A: Spring Boot Backend
```bash
cd collect_de_fond_SpringBoot
mvn clean install
mvn spring-boot:run
```
Spring Boot server will run on `http://localhost:8080`

#### Option B: Node.js Backend
```bash
cd Collect_de_fond_React/Back-end
npm install
npm start
```
Node.js server will run on `http://localhost:5000`

## Environment Configuration
1. Create appropriate `.env` files in both frontend and backend directories
2. Configure database connections:
   - For MySQL (Spring Boot): Update `application.properties`
   - For MongoDB (Node.js): Set MongoDB URI in `.env`

## Development
- Frontend development server: `npm start`
- Backend development:
  - Spring Boot: `mvn spring-boot:run`
  - Node.js: `npm run dev`

## Production Deployment
1. Build frontend: `npm run build`
2. Configure production environment variables
3. Deploy backend to your preferred hosting service
4. Set up database backups and monitoring

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details
