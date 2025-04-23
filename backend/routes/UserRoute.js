import express from "express";
import {
    createUser,
    deleteUser,
    getUsers, 
    getUsersById,
    loginUser,
    
} from "../controller/UserController.js";

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);
export default router;