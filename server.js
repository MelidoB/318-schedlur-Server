const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'https://318-schedlur-client.vercel.app', // Allow only your frontend
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./event/eventRoutes'));
app.use('/api/routines', require('./routine/routineRoutes'));
app.use('/api/settings', require('./settings/settingsRoutes'));

// Handle root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Handle favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Handle non-existent routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
