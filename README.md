Project Overview
The RBAC (Role-Based Access Control) Employee Management System is a web application designed to manage employee information and access levels within an organization. The system implements role-based access control, where users are assigned roles (Admin, HR, Employee) that determine their access rights within the system.
Technologies Used
Frontend: The frontend of the application is built using React.js with Vite as the build tool. React Router is used for routing within the application.
Backend: The backend is developed using Node.js with Express.js for creating RESTful APIs. MySQL is used as the database management system to store employee and category information.
Authentication: JWT (JSON Web Tokens) are used for authentication. Bcrypt is used for password hashing.
File Upload: Multer is used for handling file uploads, allowing users to upload employee photos.
Deployment
Backend: The backend is hosted on Railway, a platform for deploying Node.js applications. Railway provides easy deployment and scaling of Node.js applications.
Frontend: The frontend is hosted on Vercel, a platform for static site hosting and serverless functions. Vercel provides a fast and reliable hosting solution for React.js applications.
Database: The MySQL database is hosted on a cloud platform, such as Cloud SQL or AWS RDS, managed through phpMyAdmin for easy database management.
Software Functionalities
Admin Dashboard
Login
Admin can log in using their email and password.
Password is securely hashed and compared with the stored hash in the database.
Upon successful login, a JWT token is generated and stored in a cookie for authentication.
Category Management
Admin can view all existing categories.
Admin can add a new category.
Each category has a unique name.
Employee Management
Admin can view a list of all employees.
Admin can add a new employee.
Required employee details: Name, Last Name, Email, Password, Category, Role, Photo.
Password is securely hashed before storage.
Admin can view details of a specific employee.
Admin can edit employee details.
Admin can update employee information, including Name, Last Name, Email, Category, and Role.
Admin can choose to update the password, which will be securely hashed.
Admin can delete an employee.
Logout
Admin can log out, which clears the JWT token from the cookie.
Statistics
Admin can view the total count of admins and employees in the system.
HR Dashboard
Login
HR can log in using their email and password.
Password is securely hashed and compared with the stored hash in the database.
Upon successful login, a JWT token is generated and stored in a cookie for authentication.
Employee Management
HR can view a list of all employees.
HR can add a new employee.
Required employee details: Name, Last Name, Email, Password, Category, Role, Photo.
Password is securely hashed before storage.
HR can view details of a specific employee.
HR can edit employee details.
HR can update employee information, including Name, Last Name, Email, Category, and Role.
HR can choose to update the password, which will be securely hashed.
HR can delete an employee.
Logout
HR can log out, which clears the JWT token from the cookie.
User Dashboard
Login
User can log in using their email and password.
Password is securely hashed and compared with the stored hash in the database.
Upon successful login, a JWT token is generated and stored in a cookie for authentication.
Employee Profile
User can view their own profile details.
Name, Last Name, Email, Role.
Profile Update
User can update their own profile details.
Name, Last Name, Email.
Logout
User can log out, which clears the JWT token from the cookie.





PROJECT LINKS:

CODES: https://github.com/elvind007/code-test-nabina
DEPLOY: code-test-nabina.vercel.app


TEST ACCOUNTS:


ADMIN: 	admin@gmail.com		admin
HR: 		HR@gmail.com		hrtest
Employee:	emp@gmail.com		emptest





