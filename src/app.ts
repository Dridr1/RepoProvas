import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";


const PORT = process.env.PORT || 5000;

const app = express();

app.use(json());
app.use(cors());
app.use(router);


app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});

export default app;