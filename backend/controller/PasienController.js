import { where } from "sequelize";
import Pasien from "../models/PasienModel.js";

export const getPasien = async (req, res) => {
    try {
      const response = await Pasien.findAll();
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  };

export const getPasienById = async (req, res) => {
    try {
      const response = await Pasien.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  
  export const createPasien = async (req, res) => {
    try {
      const inputResult = req.body;
      await Pasien.create(inputResult);
      res.status(201).json({ msg: "Pasien Created" });
    } catch (error) {
      console.log(error.message);
    }
  };

  
  export const updatePasien = async (req, res) => {
    try {
      await Pasien.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Pasien Updated" });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const deletePasien = async (req, res) => {
    try {
      await Pasien.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Pasien Deleted" });
    } catch (error) {
      console.log(error.message);
    }
  };