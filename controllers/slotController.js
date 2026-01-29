const { slots, doctors } = require('../data/store');
const { v4: uuidv4 } = require('uuid');

function createSlot(req, res) {
  const { doctor_id, start_time, end_time, max_capacity } = req.body;

  if (!doctor_id || !start_time || !end_time || !max_capacity) {
    return res.status(400).json({
      message: "doctor_id, start_time, end_time, and max_capacity are required"
    });
  }

  // Check if doctor exists
  const doctor = doctors.find(d => d.id === doctor_id);
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const slot = {
    id: uuidv4(),
    doctor_id,
    start_time,
    end_time,
    max_capacity,
    current_count: 0
  };

  slots.push(slot);

  res.status(201).json(slot);
}

function getSlot(req, res) {
  const slot = slots.find(s => s.id === req.params.id);

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  res.json(slot);
}

module.exports = {
  createSlot,
  getSlot
};
