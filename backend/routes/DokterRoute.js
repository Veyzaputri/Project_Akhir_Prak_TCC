import express from "express";
import {
    getDokter,
    getDokterById,
    createDokter,
    updateDokter,
    deleteDokter,
    
} from "../controller/DokterController.js";

const router = express.Router();
router.get("/doctor", getDokter);
router.get("/dokter/:id_dokter", getDokterById);
router.post("/add-doctor", createDokter);
router.put("/dokter/:id_dokter", updateDokter);
router.delete("/dokter/:id_dokter", deleteDokter);
export default router;