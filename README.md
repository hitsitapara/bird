# Employee Management System

A simple Employee Management System with a **Node.js backend** (API) and a **React.js frontend**.

### Backend
- **Technology**: Node.js, Express.js, MySQL.
- **Features**:
  - Add a new employee.
  - View a list of employees.
  - Update employee details.
  - Delete an employee.

### Frontend
- **Technology**: React.js, Axios, Bootstrap
- **Features**:
  - **Dashboard**: View a table of employees.
  - **Add Employee**: Form to add a new employee.
  - **Edit Employee**: Page to update employee details.
  - **Delete Employee**: Option to delete an employee.
  - **Toaster Notifications**: Success and error messages for actions.

---

## Getting Started

### Prerequisites
- **Node.js**
- **npm** or **yarn**
- **MySQL** Database

---

### Setting Up the Project

#### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/employee-management-system.git
cd employee-management-system
```
#### 2. Backend Setup
  ##### 1. Navigate to the backend directory:
  ```bash
    cd backend
  ```
  ##### 2. Install dependencies:
  ```bash
    npm install
  ```
  ##### 3. Create a .env file:
  ```bash
    DATABASE_HOST='' # Replace with your database host
    DATABASE_NAME='' # Replace with your database name
    DATABASE_USERNAME='' # Replace with your MySQL username
    DATABASE_PASSWORD='' # Replace with your MySQL password
    PORT=5000 # Replace with your port
  ```
  ##### 4. Setup the database schema:
  - Move to the script folder and run the setupDatabase.js file with node
  ```bash
    cd script
    node setupDatabase.js
  ```
  ##### 5. Start the server:
  ```bash
    npm start
  ```

#### 3. Front Setup
  ##### 1. Navigate to the backend directory:
  ```bash
    cd frontend
  ```
  ##### 2. Install dependencies:
  ```bash
    npm install
  ```
  ##### 3. Start the server:
  ```bash
    npm start
  ```
