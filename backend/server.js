require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/routes");

// this is used so that we can use our put , delete request properly ..
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  //  console.log(req.path, req.method);
  next(); // if i dont use it over here it will going to stuck over here !!!!///
});

app.use("/todo", workoutRoutes);

// connecting to the mongodb database ...

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log("listenig to the port no 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// it also has a extra parameter involved in it ./
