import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import express from "express";
dotenv.config();
import sequelize from "./sequelize.js";
import authRoute from "./routes/authRoute.js";
import wordRoute from "./routes/wordRoute.js";
import stateRoute from "./routes/stateRoute.js"
import cors from "cors"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));




app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/word", wordRoute);
app.use("/api/state", stateRoute)




// app.post("/signUp", (req, res) => {
//   const { username, email, password } = req.body;
//   console.log("Received signup data:", req.body);
// }); 


sequelize
  .sync({alter: false})
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
