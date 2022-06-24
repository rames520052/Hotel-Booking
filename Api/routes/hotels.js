import express from 'express'
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';

const router = express.Router();

// ADD 
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET ONE
router.get("/:id", getHotel)

// GET ALL 
router.get("/", getHotels)

export default router
