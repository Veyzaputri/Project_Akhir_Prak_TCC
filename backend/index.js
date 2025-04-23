import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PasienRoute from "./routes/PasienRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import PeriksaRoute from "./routes/PeriksaRoute.js";

const app = express();
app.use(cors());
import { getUsers } from "./controller/UserController.js";

app.use(express.json());
app.use(UserRoute);
app.use(PasienRoute);
app.use(DokterRoute);
app.use(PeriksaRoute);

app.get("/", async (req, res) => {
    try {
        await getUsers(req, res); // Langsung panggil fungsi getUsers
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

app.listen(5000, "0.0.0.0", ()=> console.log('Server up and running...'));
