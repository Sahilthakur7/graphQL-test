const graphql = require('graphql');

const { GraphQLOjectType, GraphQLString } = graphql;

const PlayerType = new GraphQLOjectType({
	name: 'Player',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		position: { type: GraphQLString}
	}),
});