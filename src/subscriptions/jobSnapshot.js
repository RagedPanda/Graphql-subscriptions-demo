const socket = require('../socket');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

const {
  additionalReportFields,
  progressSummaryFields,
  propertyFields,
  jobFields, 
  cleanerFields,
  problemFields,
  checklistFields,
  bookingFields,
  senderFields 
} = require("./types");

const jobSnapshot = new GraphQLObjectType({
  name: "snapshot",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
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
    hostStatus: {
      type: GraphQLString,
    },
    cleanerStatus: {
      type: GraphQLString,
    },
    job: {
      type: jobFields,
    },
    cleaners: {
      type: new GraphQLList(cleanerFields),
    },
    progress: {
      type: progressSummaryFields,
    },
    ownerRole: {
      type: GraphQLString,
    },
    permittedFeatures: {
      type: new GraphQLList(GraphQLString),
    },
    problems: {
      type: new GraphQLList(problemFields),
    },
    additionalInformationReport: {
      type: new GraphQLList(additionalReportFields),
    },
    checklists: {
      type: new GraphQLList(checklistFields),
    },
    booking: {
      type: bookingFields,
    },
    lastUpdatedAt: {
      type: GraphQLString,
    },
    successfulMutations: {
      type: new GraphQLList(GraphQLString),
    },
    failedMutations: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

module.exports = {
  type: jobSnapshot,
  subscribe: () => socket.asyncIterator('JOB_SNAPSHOT')
};