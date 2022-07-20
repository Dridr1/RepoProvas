import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();



app.listen(5000, () => {
    console.log(`Server running on PORT ${5000}`);
});