import express from "express";
import {
    getPeriksa,
    getPeriksaById,
    createPeriksa,
    updatePeriksa,
    deletePeriksa,
} from "../controller/PeriksaController.js";

const router = express.Router();

router.get("/periksa", getPeriksa); 
router.get("/periksa/:id_periksa", getPeriksaById);  
router.post("/add-periksa", createPeriksa);               
router.put("/periksa/:id_periksa", updatePeriksa);
router.delete("/periksa/:id_periksa", deletePeriksa);   

export default router;
