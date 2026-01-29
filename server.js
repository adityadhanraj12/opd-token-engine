const express = require('express');
const app = express();

// Import Routes
const doctorRoutes = require('./routes/doctorRoutes');
const slotRoutes = require('./routes/slotRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

// Middleware
app.use(express.json());

// Route Mounting
app.use('/doctors', doctorRoutes);
app.use('/slots', slotRoutes);
app.use('/tokens', tokenRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send("OPD Token Engine Running 🚀");
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
