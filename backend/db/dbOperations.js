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

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
