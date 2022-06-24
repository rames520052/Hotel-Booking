import express from 'express'
import { deleteUser, getUser, getUserss, updateUser } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in ");
})

// UPDATE
router.put("/:id", updateUser)

// DELETE
router.delete("/:id", deleteUser)

// GET ONE
router.get("/:id", getUser)

// GET ALL 
router.get("/", getUsers)

export default router

