const { doctors } = require('../data/store');
const { v4: uuidv4 } = require('uuid');

function createDoctor(req, res) {

  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Doctor name is required" });
  }

  const doctor = {
    id: uuidv4(),
    name
  };

  doctors.push(doctor);

  res.status(201).json(doctor);
}

module.exports = {
  createDoctor
};
