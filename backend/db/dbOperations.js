const sql = require("msnodesqlv8");
const config = require("./dbConfig");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users";
    sql.query(config.connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const addUser = (user) => {
  return new Promise((resolve, reject) => {
    const { nom, prenom, email, telephone, poste, date_embauche } = user;
    const query = `
      INSERT INTO Users (nom, prenom, email, telephone, poste, date_embauche) 
      OUTPUT INSERTED.id, INSERTED.nom, INSERTED.prenom, INSERTED.email, INSERTED.telephone, INSERTED.poste, INSERTED.date_embauche
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    sql.query(
      config.connectionString,
      query,
      [nom, prenom, email, telephone, poste, date_embauche],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]); // ✅ Ensure we return the inserted row
        }
      }
    );
  });
};

const updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    const { nom, prenom, email, telephone, poste, date_embauche } = user;
    const query = `
      UPDATE Users
      SET nom = ?, prenom = ?, email = ?, telephone = ?, poste = ?, date_embauche = ?
      WHERE id = ?
    `;
    sql.query(
      config.connectionString,
      query,
      [nom, prenom, email, telephone, poste, date_embauche, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Users WHERE id = ?`;
    sql.query(config.connectionString, query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Get all tasks
const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Tasks";
    sql.query(config.connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Add a new task
const addTask = (task) => {
  return new Promise((resolve, reject) => {
    const { title, description, assigned_to, due_date, status } = task;
    const query = `
      INSERT INTO Tasks (title, description, assigned_to, due_date, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    sql.query(
      config.connectionString,
      query,
      [title, description, assigned_to, due_date, status],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Update a task
const updateTask = (id, task) => {
  return new Promise((resolve, reject) => {
    const { title, description, assigned_to, due_date, status } = task;
    const query = `
      UPDATE Tasks
      SET title = ?, description = ?, assigned_to = ?, due_date = ?, status = ?
      WHERE id = ?
    `;
    sql.query(
      config.connectionString,
      query,
      [title, description, assigned_to, due_date, status, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Delete a task
const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Tasks WHERE id = ?`;
    sql.query(config.connectionString, query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
