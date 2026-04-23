# CloudKitchen Fullstack Application

A comprehensive full-stack Cloud Kitchen web application built with React, Node.js, Express, and Firebase. This application features authentication, dynamic menu management, and order processing, providing a complete solution for modern food delivery operations.

## Features
- **User Authentication:** Secure login and registration using Firebase Auth.
- **Dynamic Menu:** Browse and manage available food items effortlessly.
- **Order Processing:** Seamless checkout and order tracking for customers.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## Tech Stack
- **Frontend:** React 19, Vite, React Router, Tailwind CSS (or standard CSS), Swiper
- **Backend:** Node.js, Express.js, Firebase Admin SDK
- **Database/Auth:** Firebase Firestore & Firebase Authentication

## Folder Structure Overview
```
CloudKitchen/
├── Backend/                 # Express API & Firebase integration
│   ├── config/              # Firebase admin setup
│   ├── routes/              # Express routes (menu, orders, etc.)
│   ├── data/                # Initial data dumps/seeds
│   ├── .env.example         # Environment variables template
│   └── server.js            # Main entry point
├── Frontend/                # React Vite application
│   ├── public/              # Static assets
│   ├── src/                 # React components, pages, context, and API services
│   ├── .env.example         # Environment variables template
│   └── package.json         # Frontend dependencies
└── README.md
```

## Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/kritik50/cloudkitchen-fullstack.git
cd cloudkitchen-fullstack
```

### 2. Backend Setup
1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Firebase Admin SDK credentials in `.env`.
4. Start the backend server:
   ```bash
   npm run dev
   # Server runs on http://localhost:5000
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the Frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `VITE_API_URL` if your backend is running on a different port.
4. Start the frontend development server:
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

## API Overview (Backend)
- `GET /api/menu`: Retrieve available menu items.
- `POST /api/orders`: Submit a new customer order.
- Authentication checks via Firebase middleware on protected routes.

## Future Improvements
- Admin Dashboard for managing inventory and tracking active orders.
- Email/SMS notifications for order status updates.
- Integration with external payment gateways (e.g., Stripe, Razorpay).
