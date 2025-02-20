// controllers/employeeController.js
const Employee = require("../models/EmployeeModel");

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    if (!searchQuery) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a search query" });
    }

    

    let query = {
      $or: [
        { employeeName: { $regex: searchQuery, $options: "i" } },
        { employeeEmail: searchQuery },
      ],
    };

    console.log("🛠 MongoDB Query:", query);

    const employees = await Employee.find(query);

    console.log("✅ Matched Employees:", employees);

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("❌ Search API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
