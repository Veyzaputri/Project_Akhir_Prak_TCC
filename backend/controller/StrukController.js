import Struk from "../models/StrukModel.js"; 
import Pasien from "../models/PasienModel.js"; 
import Obat from "../models/ObatModel.js"; 
import Periksa from "../models/PeriksaModel.js";

// Get all Struks
export const getAllStruk = async (req, res) => {
  try {
    const struk = await Struk.findAll({
      include: [
        {
          model: Pasien,
          attributes: ["nama"], 
        },
        {
          model: Obat,
          attributes: ["nama_obat", "harga"], 
        },
        {
          model: Periksa,
          attributes: ["tanggal_periksa", "biaya_periksa"], 
        },
      ],
    });
    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Struks: " + error.message });
  }
};

// Get Struk by ID
export const getStrukById = async (req, res) => {
  const { id_struk } = req.params;

  if (!id_struk) {
    return res.status(400).json({ message: "Struk ID is required" });
  }

  try {
    const struk = await Struk.findByPk(id_struk, {
      include: [
        {
          model: Pasien,
          attributes: ["nama"],
        },
        {
          model: Obat,
          attributes: ["nama_obat", "harga"],
        },
        {
          model: Periksa,
          attributes: ["tanggal_periksa", "biaya_periksa"],
        },
      ],
    });

    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Struk: " + error.message });
  }
};

// Create a new Struk
export const createStruk = async (req, res) => {
  const { id_pasien, id_obat, id_periksa } = req.body;

  if (!id_pasien || !id_obat || !id_periksa) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const obat = await Obat.findByPk(id_obat);
    const periksa = await Periksa.findByPk(id_periksa);

    if (!obat) {
      return res.status(404).json({ message: "Obat not found" });
    }

    if (!periksa) {
      return res.status(404).json({ message: "Periksa not found" });
    }

    const total_biaya = obat.harga + periksa.biaya_periksa;

    const newStruk = await Struk.create({
      id_pasien,
      id_obat,
      id_periksa,
      total_biaya,
    });

    res.status(201).json(newStruk);
  } catch (error) {
    res.status(500).json({ message: "Failed to create Struk: " + error.message });
  }
};

// Update Struk by ID
export const updateStruk = async (req, res) => {
  const { id } = req.params;
  const { id_pasien, id_obat, id_periksa, total_biaya } = req.body;

  if (!id_pasien && !id_obat && !id_periksa && !total_biaya) {
    return res.status(400).json({ message: "At least one field must be provided to update" });
  }

  try {
    const struk = await Struk.findByPk(id);

    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    struk.id_pasien = id_pasien || struk.id_pasien;
    struk.id_obat = id_obat || struk.id_obat;
    struk.id_periksa = id_periksa || struk.id_periksa;
    struk.total_biaya = total_biaya || struk.total_biaya;

    await struk.save();
    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Struk: " + error.message });
  }
};

// Delete Struk by ID
export const deleteStruk = async (req, res) => {
  const { id } = req.params;

  try {
    const struk = await Struk.findByPk(id);
    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    await struk.destroy();
    res.status(200).json({ message: "Struk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Struk: " + error.message });
  }
};
