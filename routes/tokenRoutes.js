const express = require('express');
const router = express.Router();

const { createToken, cancel, getAllTokens } = require('../controllers/tokenController');

// Book Token
router.post('/', createToken);

// Cancel Token
router.put('/:id/cancel', cancel);

// Get All Tokens
router.get('/', getAllTokens);

module.exports = router;
