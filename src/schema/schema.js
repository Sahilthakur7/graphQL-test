const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//Dummy data

const players = [
  { id: '1', name: 'Scott McTominay', position: 'CDM' },
  { id: '2', name: 'Bruno Fernandes', position: 'CAM' },
  { id: '3', name: 'Jadon Sancho', position: 'RWM' },
  { id: '4', name: 'Memphis', position: 'RWM' },
];

const teams = [
  { id: '1', name: 'Man Utd', country: 'England' },
  { id: '2', name: 'Barcelona', country: 'Spain' },
  { id: '3', name: 'Schalke', country: 'Germany' },
];

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: GraphQLString },
  }),
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(players, { id: args.id });
      },
    },
    team: {
      type: TeamType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(teams, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
