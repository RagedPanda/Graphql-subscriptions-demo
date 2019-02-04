const socket = require('../socket');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require("graphql");

const { propertyFields, progressSummaryFields, jobFields, senderFields } = require("./types");

const AllJobListItems = new GraphQLObjectType({
  name: "JobList",
  fields: {
    id: {
      type: GraphQLID,
    },
    sender: {
      type: senderFields,
    },
    property: {
      type: propertyFields,
    },
    status: {
      type: GraphQLString,
    },
    job: {
      type: jobFields,
    },
    progress: {
      type: progressSummaryFields,
    },
    lastUpdatedAt: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  type: AllJobListItems,
  subscribe: () => socket.asyncIterator('JOB_LIST')
};