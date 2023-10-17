// models/employee.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  city: String,
  state: String,
});

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  relationship: String,
});

const employeeSchema = new mongoose.Schema({
  fullName: String,
  jobTitle: String,
  contactDetails: contactSchema,
  primaryEmergencyContact: emergencyContactSchema,
  secondaryEmergencyContact: emergencyContactSchema,
});

module.exports = mongoose.model('Employee', employeeSchema);
