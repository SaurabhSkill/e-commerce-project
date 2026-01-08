🛍️ MERN eCommerce Platform <hr>

Welcome to my full-stack eCommerce project, built from the ground up using the MERN (MongoDB, Express.js, React, Node.js) stack. This application provides a complete online shopping experience, from product browsing to secure checkout.

✨ Key Features<br>
👤 User Features<br>
🛒 Full Shopping Cart: Add, remove, and manage products in the cart.

⭐ Product Reviews & Ratings: Users can leave reviews and ratings for products.

🔝 Top Products Carousel: A dynamic carousel showcasing the highest-rated products.

🔍 Search & Pagination: Easily find products with keyword search and browse through pages.

👤 User Profiles & Order History: Registered users can view and manage their profile and see a list of all past orders.

🔒 Secure Checkout: A multi-step checkout process with shipping and payment options.

💳 Payment Integration: Secure payment processing via Razorpay.

🔑 OTP-Based Security: Secure user registration and password reset using OTP email verification.
<hr>

👑 Admin Features
📊 Admin Dashboard: A central hub for managing the entire platform.

👥 User Management: View, edit, delete, and grant admin privileges to users.

📦 Product Management: Full CRUD functionality to create, edit, and delete products.

🚚 Order Management: View all user orders and update their delivery status.

🛠️ Tech Stack
Backend: Node.js, Express.js, MongoDB (with Mongoose)

Frontend: React, Redux Toolkit, React Bootstrap

Authentication: JSON Web Tokens (JWT), OTP Verification
<hr>

Deployment: Render

🚀 Getting Started
Follow these steps to get the project running on your local machine.

Prerequisites
Clone the repository:

git clone https://github.com/SaurabhSkill/e-commerce-project.git
cd e-commerce-project

MongoDB: Create a free database on MongoDB Atlas.

Email Service: For OTPs, set up a Gmail App Password or another SMTP service.

Environment Variables
In the backend folder, create a .env file and add your credentials. You can use the .env.example file as a template.

NODE_ENV=development
PORT=5000
JWT_SECRET=YOUR_JWT_SECRET
MONGO_URI=YOUR_MONGO_URI

# Email Credentials
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=YOUR_EMAIL@gmail.com
EMAIL_PASS=YOUR_16_DIGIT_APP_PASSWORD

Installation & Running the App
# Install all dependencies (backend & frontend)
npm install
npm run client:install

# Run both servers concurrently
npm run dev

The application will be available at http://localhost:3000.

DATABASE Seeding
To populate the database with sample users and products, use the following commands from the root directory:

# Import data (wipes existing data)
npm run data:import

# Destroy all data
npm run data:destroy
<a href="https://deepwiki.com/SaurabhSkill/e-commerce-project"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
📛 Contact & Connect<br>

Developer: Saurabh Gupta

GitHub: github.com/SaurabhSkill

LinkedIn: [linkedin.com/in/saurabh-gupta-0902642a4](http://linkedin.com/in/saurabh-gupta-0902642a4)
