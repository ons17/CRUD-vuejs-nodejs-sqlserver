const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../db/dbOperations");

// UserType definition
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    nom: { type: GraphQLString },
    prenom: { type: GraphQLString },
    email: { type: GraphQLString },
    telephone: { type: GraphQLString },
    poste: { type: GraphQLString },
    date_embauche: { type: GraphQLString },
  },
});

// TaskType definition
const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    assigned_to: { type: GraphQLInt },
    due_date: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

// RootQuery definition
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return getAllUsers();
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return getAllTasks();
      },
    },
  },
});

// Mutation definition
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        email: { type: GraphQLString },
        telephone: { type: GraphQLString },
        poste: { type: GraphQLString },
        date_embauche: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addUser(args);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        email: { type: GraphQLString },
        telephone: { type: GraphQLString },
        poste: { type: GraphQLString },
        date_embauche: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateUser(args.id, args);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return deleteUser(args.id);
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        assigned_to: { type: new GraphQLNonNull(GraphQLInt) },
        due_date: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addTask(args);
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        assigned_to: { type: GraphQLInt },
        due_date: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve(parent, { id, ...task }) {
        return updateTask(id, task);
      },
    },
    deleteTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { id }) {
        return deleteTask(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
