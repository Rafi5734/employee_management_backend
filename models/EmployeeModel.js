// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true, unique: true },
    employeePhoneNumber: { type: String, required: true },
    employeeStatus: { type: String, enum: ["Active", "Inactive", "Vacation"], default: "Active" },
    employeeDepartment: { type: String, required: true },
    employeeAddress: { type: String, required: true },
    employeeProfilePicture: { type: String, required: true }, // URL link
    employeeCoverImage: { type: String, required: true } // URL link
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
