const dbOperations = require("../db/dbOperations");

// Resolver for getting all users
const getAllUsers = () => {
  return dbOperations.getAllUsers();
};

// Resolver for getting a user by ID
const getUserById = (id) => {
  return dbOperations.getAllUsers().then((users) => {
    return users.find((user) => user.id === id);
  });
};

// Resolver for adding a new user
const addUser = (user) => {
  const newUser = {
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    poste: user.poste,
    date_embauche: user.date_embauche,
  };
  return dbOperations.addUser(newUser);
};

// Resolver for updating an existing user
const updateUser = (id, updatedUser) => {
  return dbOperations.updateUser(id, updatedUser);
};

// Resolver for deleting a user
const deleteUser = (id) => {
  return dbOperations.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
