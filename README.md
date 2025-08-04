MERN eCommerce Platform
A full-featured eCommerce platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. This project includes a complete shopping cart, product rating and review system, user authentication, an admin dashboard for managing users, products, and orders, and payment integration.


Key Features
👤 User Features
Full Shopping Cart: Add, remove, and manage products in the cart.

Product Reviews & Ratings: Users can leave reviews and ratings for products.

Search & Pagination: Easily find products with keyword search and browse through pages.

User Profiles: Registered users can view and manage their profile and order history.

Secure Checkout: A multi-step checkout process with shipping and payment options.

Payment Integration: Secure payment processing via Razorpay.

OTP-Based Authentication: Secure user registration and password reset using OTP email verification.

👑 Admin Features
Admin Dashboard: A central hub for managing the entire platform.

User Management: View, edit, delete, and grant admin privileges to users.

Product Management: Full CRUD functionality to create, edit, and delete products.

Order Management: View all user orders and update their delivery status.

🛠️ Tech Stack
Backend: Node.js, Express.js, MongoDB (with Mongoose)

Frontend: React, Redux Toolkit, React Bootstrap

Authentication: JSON Web Tokens (JWT), OTP Verification

Deployment: Render

🚀 Getting Started
Follow these steps to get the project running on your local machine.

Prerequisites
Clone the repository:

git clone https://github.com/SaurabhSkill/e-commerce-project.git
cd e-commerce-project

MongoDB: Create a free database on MongoDB Atlas.

Email Service: For OTPs, set up an email service like Brevo or a Gmail App Password.

Environment Variables
In the backend folder, rename the .env.example file to .env and add your credentials:

NODE_ENV=development
PORT=5000
JWT_SECRET=YOUR_JWT_SECRET
MONGO_URI=YOUR_MONGO_URI

# Email Credentials
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=YOUR_EMAIL@gmail.com
EMAIL_PASS=YOUR_16_DIGIT_APP_PASSWORD

Installation
Install dependencies for both the server and the client:

# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend

Running the Application
To run both the frontend and backend servers concurrently:

npm run dev

The application will be available at http://localhost:3000.

⚙️ Database Seeding
To populate the database with sample users and products, use the following commands from the root directory:

# Import data (wipes existing data)
npm run data:import

# Destroy all data
npm run data:destroy

📛 Contact & Connect
Developer: Saurabh Gupta

GitHub: github.com/SaurabhSkill

LinkedIn: linkedin.com/in/saurabh-gupta-0902642a4

🤝 Contributing
Contributions are welcome! Please fork the repository, create a new branch for your feature or fix, and submit a pull request.
# e-commerce-project