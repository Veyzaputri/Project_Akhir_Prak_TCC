import express from "express";
import {
    getObat,
    getObatById,
    createObat,
    updateObat,
    deleteObat
} from "../controller/ObatController.js";

const router = express.Router();

router.get("/obat", getObat);
router.get("/obat/:id_obat", getObatById);
router.post("/add-obat", createObat);
router.put("/obat/:id_obat", updateObat);
router.delete("/obat/:id_obat", deleteObat);

export default router;
