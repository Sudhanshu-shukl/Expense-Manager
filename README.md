# Expense Manager

A modern expense tracking application built with React and Node.js. Track your spending, set budgets, and visualize your financial data with interactive charts.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Google Sign-In**: Quick authentication using Google OAuth
- **Expense Management**: Add, edit, and delete expenses with categories
- **Budget Tracking**: Set monthly budgets and monitor spending
- **Data Visualization**: Interactive charts showing spending patterns and trends
- **CSV Import/Export**: Backup and restore your expense data
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Chart.js for data visualization
- Lucide React for icons

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sudhanshu-shukl/Expense-Manager.git
cd Expense-Manager
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

4. Set up environment variables

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/Expense
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
```

5. Start the development servers

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
ExpenseManager/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context for state management
│   └── assets/            # Static assets
├── server/                # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── public/                # Public assets
└── package.json           # Frontend dependencies
```

## API Endpoints

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

**Expenses:**
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Deployment

### GitHub Pages (Frontend Only)

The frontend is configured for GitHub Pages deployment. For full functionality, you'll need to deploy the backend separately.

### Full Stack Deployment

For complete functionality, deploy both frontend and backend:

1. Deploy the backend to a service like Heroku, Railway, or DigitalOcean
2. Update the API endpoints in the frontend configuration
3. Deploy the frontend to GitHub Pages or Netlify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Sudhanshu Shukla**
- GitHub: [@Sudhanshu-shukl](https://github.com/Sudhanshu-shukl)
- Portfolio: [sudhanshu-shukl.github.io](https://sudhanshu-shukl.github.io/portfolio)
Commit 1 at 2025-09-15 00:55:51

Commit 2 at 2025-09-15 00:55:51

Commit 3 at 2025-09-15 00:55:51

Commit 4 at 2025-09-15 00:55:51

Commit 5 at 2025-09-15 00:55:51

Commit 6 at 2025-09-15 00:55:51

Commit 7 at 2025-09-15 00:55:51

Commit 1 at 2025-09-17 00:24:41

Commit 2 at 2025-09-17 00:24:41

Commit 3 at 2025-09-17 00:24:41

Commit 4 at 2025-09-17 00:24:41

Commit 5 at 2025-09-17 00:24:41

Commit 6 at 2025-09-17 00:24:41

Commit 7 at 2025-09-17 00:24:41

Commit 1 at 2025-09-22 22:38:55

Commit 2 at 2025-09-22 22:38:56

Commit 3 at 2025-09-22 22:38:56

Commit 1 at 2025-09-23 23:17:43

Commit 2 at 2025-09-23 23:17:43

Commit 3 at 2025-09-23 23:17:43

Commit 1 at 2025-09-25 18:11:41

Commit 2 at 2025-09-25 18:11:41

Commit 3 at 2025-09-25 18:11:41

Commit 4 at 2025-09-25 18:11:41

Commit 5 at 2025-09-25 18:11:41

Commit 6 at 2025-09-25 18:11:42

Commit 7 at 2025-09-25 18:11:42

Commit 8 at 2025-09-25 18:11:42

Commit 1 at 2025-09-26 14:00:04

Commit 2 at 2025-09-26 14:00:04

Commit 3 at 2025-09-26 14:00:04

Commit 4 at 2025-09-26 14:00:04

Commit 5 at 2025-09-26 14:00:04

Commit 6 at 2025-09-26 14:00:04

Commit 7 at 2025-09-26 14:00:04

Commit 8 at 2025-09-26 14:00:04

Commit 1 at 2025-09-28 17:06:44

Commit 2 at 2025-09-28 17:06:44

Commit 3 at 2025-09-28 17:06:44

Commit 4 at 2025-09-28 17:06:45

Commit 5 at 2025-09-28 17:06:45

Commit 6 at 2025-09-28 17:06:45

Commit 7 at 2025-09-28 17:06:45

Commit 8 at 2025-09-28 17:06:45

Commit 9 at 2025-09-28 17:06:45

Commit 10 at 2025-09-28 17:06:45

Commit 11 at 2025-09-28 17:06:46

Commit 12 at 2025-09-28 17:06:46

Commit 13 at 2025-09-28 17:06:46

Commit 14 at 2025-09-28 17:06:46

Commit 15 at 2025-09-28 17:06:46

Commit 1 at 2025-09-30 21:31:53

Commit 2 at 2025-09-30 21:31:54

Commit 3 at 2025-09-30 21:31:54

Commit 4 at 2025-09-30 21:31:54

Commit 5 at 2025-09-30 21:31:54

Commit 6 at 2025-09-30 21:31:54

Commit 7 at 2025-09-30 21:31:54

Commit 8 at 2025-09-30 21:31:54

Commit 9 at 2025-09-30 21:31:54

Commit 10 at 2025-09-30 21:31:54

Commit 11 at 2025-09-30 21:31:55

Commit 12 at 2025-09-30 21:31:55

Commit 13 at 2025-09-30 21:31:55

Commit 14 at 2025-09-30 21:31:55

Commit 15 at 2025-09-30 21:31:55

Commit 1 at 2025-10-02 16:53:23

Commit 2 at 2025-10-02 16:53:23

Commit 3 at 2025-10-02 16:53:24

Commit 4 at 2025-10-02 16:53:24

Commit 5 at 2025-10-02 16:53:25

Commit 6 at 2025-10-02 16:53:25

Commit 7 at 2025-10-02 16:53:25

Commit 8 at 2025-10-02 16:53:26

Commit 9 at 2025-10-02 16:53:26

Commit 10 at 2025-10-02 16:53:27

Commit 11 at 2025-10-02 16:53:27

Commit 12 at 2025-10-02 16:53:28

Commit 13 at 2025-10-02 16:53:28

Commit 14 at 2025-10-02 16:53:28

Commit 15 at 2025-10-02 16:53:29

Commit 1 at 2025-10-02 23:57:58

Commit 2 at 2025-10-02 23:57:59

Commit 3 at 2025-10-02 23:57:59

Commit 1 at 2025-10-04 17:17:48

Commit 2 at 2025-10-04 17:17:49

Commit 3 at 2025-10-04 17:17:49

Commit 1 at 2025-10-04 17:18:18

Commit 2 at 2025-10-04 17:18:18

Commit 3 at 2025-10-04 17:18:18

Commit 4 at 2025-10-04 17:18:19

Commit 5 at 2025-10-04 17:18:19
