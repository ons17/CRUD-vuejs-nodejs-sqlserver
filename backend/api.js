const express = require("express");
const app = express();
const dboperations = require("./dbOperations");

// Middleware to parse JSON request body
app.use(express.json()); // Place this before route handlers

app.get("/employees", async (req, res) => {
  try {
    const employees = await dboperations.getAllEmploye(); // Await the promise to get data
    res.json(employees); // Send data as JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const newEmployee = req.body; // Assuming you send the data in the request body
    await dboperations.addEmployee(newEmployee);
    res.status(201).json({ message: "Employee added successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding employee", error: error.message });
  }
});
app.put("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id; // Get the employee ID from the URL
    const updatedEmployee = req.body; // Get the updated employee details from the request body
    await dboperations.updateEmployee(employeeId, updatedEmployee); // Call the update function in dbOperations
    res.status(200).json({ message: "Employee updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
});
app.delete("/employees/:id", async (req, res) => {
  const employeeId = req.params.id; // Get employee ID from the URL parameter
  try {
    const rowsAffected = await dboperations.deleteEmployee(employeeId);
    if (rowsAffected > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
