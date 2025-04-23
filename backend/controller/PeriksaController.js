import { where } from "sequelize";
import Periksa from "../models/PeriksaModel.js";

export const getPeriksa = async (req, res) => {
    try {
        const response = await Periksa.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPeriksaById = async (req, res) => {
    try {
        const checkup = await Periksa.findOne({
            where: { id_periksa: req.params.id_periksa }
        });

        if (!checkup) {
            return res.status(404).json({ msg: "Checkup tidak ditemukan" });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const createPeriksa = async (req, res) => {
    try {
      const periksa = await Periksa.create(req.body);
      res.status(201).json({
        message: "Pemeriksaan berhasil ditambahkan",
        id_periksa: periksa.id_periksa
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}  

export const updatePeriksa = async (req, res) => {
    try {
        await Periksa.update(req.body, {
            where: {
                id_periksa: req.params.id_periksa
            }
        });
        res.status(200).json({ msg: "This Checkup Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePeriksa = async (req, res) => {
    try {
        await Periksa.destroy({
            where: {
                id_periksa: req.params.id_periksa
            }
        });
        res.status(200).json({ msg: "This Checkup Completed Detele" });
    } catch (error) {
        console.log(error.message);
    }
}