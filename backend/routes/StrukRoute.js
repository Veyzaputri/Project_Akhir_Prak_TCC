import express from "express";
import {
    getAllStruk,
    getStrukById,
    createStruk,
    updateStruk,
    deleteStruk,
  } from "../controller/StrukController.js";  

const router = express.Router();

router.get("/struk", getAllStruk); 
router.get("/pasien/periksa/struk/:id_struk", getStrukById);
router.post("/struk", createStruk);
router.put("/struk/:id", updateStruk);
router.delete("/struk/:id", deleteStruk); 

export default router;