const { tokens } = require('../data/store');
const { bookToken, cancelToken } = require('../services/allocationService');

function createToken(req, res) {
  try {
    const { slot_id, patient_name, type } = req.body;

    if (!slot_id || !patient_name || !type) {
      return res.status(400).json({
        message: "slot_id, patient_name and type are required"
      });
    }

    const result = bookToken(slot_id, patient_name, type);
    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function cancel(req, res) {
  try {
    cancelToken(req.params.id);
    res.json({ message: "Token cancelled successfully" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function getAllTokens(req, res) {
  res.json(tokens);
}

module.exports = {
  createToken,
  cancel,
  getAllTokens
};
