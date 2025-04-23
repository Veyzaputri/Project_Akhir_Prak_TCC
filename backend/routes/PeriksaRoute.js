import express from "express";
import {
    getPeriksa,
    getPeriksaById,
    createPeriksa,
    updatePeriksa,
    deletePeriksa,
    
} from "../controller/PeriksaController.js";

const router = express.Router();
router.get("/checkup", getPeriksa);
router.get("/periksa/:id_periksa", getPeriksaById);
router.post("/add-checkup", createPeriksa);
router.put("/periksa/:id_periksa", updatePeriksa);
router.delete("/periksa/:id_periksa", deletePeriksa);
export default router;