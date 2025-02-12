const config = require("./dbConfig");
const sql = require("msnodesqlv8");

async function getAllEmploye() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM EMPLOYE";
    sql.query(config.connectionString, query, (err, rows) => {
      if (err) {
        console.error("Erreur SQL :", err);
        reject(err); // Reject promise on error
      } else {
        console.log("Liste des employés :", rows);
        resolve(rows); // Resolve promise with rows
      }
    });
  });
}

const addEmployee = async (employee) => {
  try {
    const { nom, prenom, email, telephone, poste, date_embauche } = employee;
    const query = `
      INSERT INTO EMPLOYE (nom, prenom, email, telephone, poste, date_embauche) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    // Pass values as an array to avoid SQL injection
    const result = await new Promise((resolve, reject) => {
      sql.query(
        config.connectionString,
        query,
        [nom, prenom, email, telephone, poste, date_embauche],
        (err, result) => {
          if (err) {
            console.error("Error adding employee:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    return result.rowsAffected; // Returning rowsAffected
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

const updateEmployee = async (employeeId, updatedEmployee) => {
  try {
    const { nom, prenom, email, telephone, poste, date_embauche } =
      updatedEmployee;
    const query = `UPDATE EMPLOYE
                   SET nom = '${nom}', prenom = '${prenom}', email = '${email}', 
                       telephone = '${telephone}', poste = '${poste}', date_embauche = '${date_embauche}'
                   WHERE id = ${employeeId}`; // Assuming the employee has a unique "id"
    const result = await sql.query(config.connectionString, query); // Use connectionString here
    return result.rowsAffected;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

const deleteEmployee = async (employeeId) => {
  try {
    // Log the employee ID being passed
    console.log("Deleting employee with ID:", employeeId);

    // Check if the employee exists
    const checkQuery = `SELECT COUNT(*) AS count FROM EMPLOYE WHERE id = ?`;
    const resultCheck = await new Promise((resolve, reject) => {
      sql.query(
        config.connectionString,
        checkQuery,
        [employeeId], // Parameterized query
        (err, result) => {
          if (err) {
            console.error("Error checking employee existence:", err);
            reject(err);
          } else {
            console.log("Employee existence check result:", result[0].count);
            resolve(result[0].count); // Returns the count of matching records
          }
        }
      );
    });

    if (resultCheck > 0) {
      // If the employee exists, proceed with deletion
      const deleteQuery = `DELETE FROM EMPLOYE WHERE id = ?`;
      const resultDelete = await new Promise((resolve, reject) => {
        sql.query(
          config.connectionString,
          deleteQuery,
          [employeeId], // Parameterized query
          (err, result) => {
            if (err) {
              console.error("Error deleting employee:", err);
              reject(err);
            } else {
              console.log("Delete result:", result);
              resolve(result);
            }
          }
        );
      });

      // Check if rowsAffected is present
      if (resultDelete && resultDelete.rowsAffected !== undefined) {
        const rowsAffected = resultDelete.rowsAffected;
        console.log("Employee deleted. Rows affected:", rowsAffected);
        return rowsAffected; // Return how many rows were affected
      } else {
        console.log(
          "No rows were affected or result is in a different format:",
          resultDelete
        );
        return 0;
      }
    } else {
      // No employee found
      console.log("Employee not found with ID:", employeeId);
      return 0;
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

module.exports = {
  getAllEmploye,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
