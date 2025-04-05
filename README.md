# 📱🍽️ Restaurant Reservation App

A mobile application (React Native) that allows users to create, manage, and edit restaurant reservations. The backend is built with Node.js & ExpressJS and uses a MariaDB/MySQL database.

---

## 🛠️ Installation Instructions

1. ** Clone the repository: **
   `git clone https://github.com/Gzimvra/amc-restaurant-app.git`
   `cd amc-restaurant-app`

2. **Install dependencies:**

   - Frontend:  
     `cd frontend`  
     `npm install`

   - Backend:  
     `cd ../backend`  
     `npm install`

3. **Environment Variables Setup:**

   A `.env.example` file is included in the `backend/` directory as a template.  
   You can copy or rename this file to `.env` and update the values as needed:

   ```bash
   cp .env.example .env
   ```

4. **Start the application:**

   - **Backend:**

     ```bash
     cd backend
     node server.js
     ```

   - **Frontend:**

     Open a new terminal tab/window and run:

     ```bash
     cd frontend
     npx expo start
     ```

5. **Database Setup:**

   - Navigate to the `database/` folder and execute the SQL scripts in the following order to:

     - Create the database  
     - Create the necessary tables  
     - Insert initial data

   You can run these scripts using a tool like **MySQL Workbench**, **DBeaver**, **HeidiSQL**, or directly through the terminal.

   - Ensure the **MariaDB** service is running. You can start it by running the following command **in a terminal with administrator rights**:

     ```
     net start mariadb
     ```

   > ⚠️ Note: The service name must match your local MariaDB installation. It’s commonly `mariadb`, but on some systems it might be `mysql`.

---

## ⚙️ Functionality Overview

The application includes:

- User Sign Up / Login with JWT authentication
- Browse restaurants with details, descriptions, and ratings
- Create reservations with selected date, time, and number of people
- View reservation history with status indicator (Completed or Upcoming)
- Edit existing reservations if they are within a pending timeframe
- Delete existing reservations if they are within a pending timeframe
- Logout and clear authentication token

## ⚙️Functionality Overview

This application offers a complete restaurant reservation system, including:

- **User Authentication**  
  Sign up and log in using secure JWT-based authentication.

- **Restaurant Browsing**  
  View a list of restaurants with detailed descriptions, ratings, and other information.

- **Make Reservations**  
  Book a table by selecting a preferred date, time, and number of guests.

- **Reservation History**  
  View your past and upcoming reservations, with status indicators (e.g., *Completed*, *Upcoming*).

- **Edit Reservations**  
  Modify your reservations if they are still within an editable time window.

- **Cancel Reservations**  
  Delete upcoming reservations within an allowed timeframe.

- **Logout**  
  Securely log out and clear the saved authentication token.


---

## 🧰 Technologies Used

### Backend (Node.js + Express)

- **Node.js** – JavaScript runtime environment for executing backend logic.
- **Express.js** – Web framework used to create the API and handle routing.
- **MariaDB** – Relational database for managing users, restaurants, and reservations.
- **JWT (jsonwebtoken)** – Used for secure user authentication via tokens.
- **bcrypt** – For hashing and verifying user passwords securely.
- **dotenv** – Loads environment variables from a `.env` file into the application.
- **CORS** – Enables controlled access to the backend from other origins (e.g., frontend).
- **express-rate-limit** – Protects the API from brute-force attacks by limiting repeated requests.
- **date-fns** – Utility library for formatting and comparing dates.
- **uuid** – Generates unique IDs for entities such as users or reservations.
- **compression** – Middleware for GZIP compression to improve response times.
- **nodemon** *(dev only)* – Automatically restarts the server during development when files change.

### 📱 Frontend (React Native + Expo)

- **React Native** – Framework for building native apps using React.
- **Expo** – Platform and toolchain that simplifies React Native development.
- **React Navigation** – Manages screen transitions and tab navigation.
- **Axios** – Handles HTTP requests to the backend API.
- **AsyncStorage** – Local storage system used to store authentication tokens and user data.
- **React Native Paper** – UI component library based on Material Design.
- **React Native Vector Icons** – Icon library for customizable and scalable icons.
- **React Native Toast Message** – Provides in-app toast notifications.
- **Moment.js** – Used for date/time parsing and formatting in the app.
- **Expo Router** – Enables file-based routing for easier navigation setup.

### Database

- **MariaDB / MySQL** – Relational database used to store user data, restaurants, and reservation records.
- SQL setup scripts are included in the `database/` directory to:
  - Create the database and required tables.
  - Insert initial seed data (sample users, restaurants, etc.).

---

