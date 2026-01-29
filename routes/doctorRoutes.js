const express = require('express');
const router = express.Router();

const { createDoctor } = require('../controllers/doctorController');

// Create Doctor
router.post('/', createDoctor);

module.exports = router;
