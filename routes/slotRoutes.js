const express = require('express');
const router = express.Router();

const { createSlot, getSlot } = require('../controllers/slotController');

// Create Slot
router.post('/', createSlot);

// Get Slot by ID
router.get('/:id', getSlot);

module.exports = router;
