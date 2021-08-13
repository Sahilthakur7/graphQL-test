const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

//Dummy data

const players = [
  { id: '1', name: 'Scott McTominay', position: 'CDM', teamId: '1' },
  { id: '2', name: 'Bruno Fernandes', position: 'CAM', teamId: '1' },
  { id: '3', name: 'Jadon Sancho', position: 'RWM', teamId: '1' },
  { id: '4', name: 'Memphis', position: 'RWM', teamId: '2' },
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
    team: {
      type: TeamType,
      resolve(parent, args) {
        return _.find(teams, { id: parent.teamId });
      },
    },
  }),
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return _.filter(players, { teamId: parent.id });
      },
    },
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
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return players;
      },
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return teams;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
