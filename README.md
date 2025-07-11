🛡️ Authent - Scan. Verify. Access Securely
Authent is a secure two-factor authentication (2FA) web application that integrates QR code-based TOTP (Time-Based One-Time Password) for enhanced user login security. It allows users to scan a QR code with mobile authenticator apps like Google Authenticator, Authy, or Microsoft Authenticator during signup and requires them to verify with generated OTPs at login.

🌟 Features
✅ User Signup & Login

Secure signup with bcrypt password hashing.

Login flow includes TOTP-based 2FA verification.

✅ QR Code Generation

On signup, users scan a unique QR code using their preferred authenticator app.

✅ TOTP Verification

6-digit OTP validation during login using Speakeasy.

✅ Forgot Password Workflow

Email-based reset token sent securely with NodeMailer.

✅ Contact Form

Real backend email submission handled by NodeMailer.

✅ Protected Dashboard

JWT-secured routes ensure only authenticated users access sensitive areas.

✅ Responsive Frontend

Built with React and Material-UI for a modern, mobile-friendly design.

✅ Modular Backend

Node.js & Express with clean, separate route handling.

🚀 Tech Stack
Frontend	Backend	Database	Security
React.js	Node.js (Express)	MongoDB Atlas	JWT Authentication
Material-UI	Speakeasy	Mongoose	Bcrypt Passwords
React-Router DOM	NodeMailer		CORS Enabled

🛠 Setup Instructions
1️⃣ Clone the Repository

git clone https://github.com/yourusername/authent.git
cd authent

2️⃣ Backend Setup
Navigate to the backend folder:
cd backend

Install dependencies:
npm install

Create a .env file:
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
BASE_URL=http://localhost:3000

Start the backend:
node server.js

3️⃣ Frontend Setup
Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the frontend:
npm start

The frontend runs on http://localhost:3000
The backend runs on http://localhost:5000

🧪 Workflow
Sign Up

User signs up and gets a QR code.

Scans QR with Authenticator app.

2FA Setup

After setup, users verify the TOTP.

Login

Enter email/password + OTP from Authenticator like Google or Microsoft.

Forgot Password

Secure reset flow via email.

📂 Project Structure

/backend
  /routes
    contactRoute.js
    verifySetup.js
  /models
    User.js
  /utils
    mailer.js
  server.js
/frontend
  /src
    /Pages
      Login.js
      Signup.js
      ShowQR.js
      Dashboard.js
      Learn.js (Optional content)
      News.js
      about.js
      Contact.js
    App.js
