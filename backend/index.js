import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PasienRoute from "./routes/PasienRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import PeriksaRoute from "./routes/PeriksaRoute.js";
<<<<<<< HEAD
import ObatRoute from "./routes/ObatRoute.js"
=======
import ObatRoute from "./routes/ObatRoute.js";
>>>>>>> 73d4460f2b743fe6fdd8d0b715f41ff55ade6960

const app = express();
app.use(cors());
import { getUsers } from "./controller/UserController.js";

app.use(express.json());
app.use(UserRoute);
app.use(PasienRoute);
app.use(DokterRoute);
app.use(PeriksaRoute);
app.use(ObatRoute);

app.get("/", async (req, res) => {
    try {
        await getUsers(req, res); // Langsung panggil fungsi getUsers
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

app.listen(5000, "0.0.0.0", ()=> console.log('Server up and running...'));
