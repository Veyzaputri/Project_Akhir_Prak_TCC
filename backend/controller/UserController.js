import { where } from "sequelize";
import User from "../models/UserModel.js";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getUsersById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) =>{
    try {
        await User.create(req.body);
        res.status(201).json({msg:"User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) =>{
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Cek password (tanpa bcrypt, langsung cocokkan)
    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // Jika login sukses
    res.status(200).json({ msg: "Login successful", user: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};