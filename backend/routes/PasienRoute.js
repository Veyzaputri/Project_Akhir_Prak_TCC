import express from "express";


import {
  getPasien,
  getPasienById,
  createPasien,
  updatePasien,
  deletePasien,
} from "../controller/PasienController.js";

const router = express.Router();

router.get("/pasien", getPasien);
router.get("/pasien/:id", getPasienById);
router.post("/add-pasien", createPasien);
router.put("/pasien/:id", updatePasien);
router.delete("/pasien/:id", deletePasien);

export default router;