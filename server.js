const express = require("express");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();
app.use(cors());

const port = process.env.PORT || 9090;
const db_url = process.env.DB_URL;

app.use(express.json());
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("this is a home route");
});



app.use('/user', userRouter);

app.listen(port, async () => {
  try {

    connectDB(db_url);
    console.log('we are successfully connected to the database')
    console.log(`server is running at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
    console.log("we got the error while connecting to the database");
  }
});
