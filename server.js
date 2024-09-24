const express = require("express");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the DB connection function

require("dotenv").config(); // Load environment variables
const app = express();
app.use(cors());

const port = process.env.PORT || 9090; // Set the server port

// Middleware to parse incoming JSON
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("This is the home route");
});

// User Routes
app.use("/user", userRouter);

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await connectDB(); // Call the connectDB function to connect to MongoDB
    console.log("Successfully connected to the database");
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  }
});
