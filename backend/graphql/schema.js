const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../db/dbOperations");

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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return getAllUsers();
      },
    },
  },
});

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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
