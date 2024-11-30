import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/user.route.js";
import { adminRoute } from "./routes/admin.route.js";
import { connectTODB } from "./db/connectToDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/user" , userRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectTODB();
});