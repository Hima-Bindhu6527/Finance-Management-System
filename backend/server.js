const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/financial-plans', require('./routes/financialPlans'));
app.use('/api/income-expense', require('./routes/incomeExpense'));
app.use('/api/metals', require('./routes/metals'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'FinCart API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});