const { GraphQLEnumType } = require("graphql");

const JobStatus = new GraphQLEnumType({
  name: "JobStatus",
  values: {
    invitePending: {
      value: "invitePending",
    },
    pending: {
      value: "pending",
    },
    viewed: {
      value: "viewed",
    },
    declined: {
      value: "declined",
    },
    accepted: {
      value: "accepted",
    },
    acceptedByOtherCleaner: {
      value: "acceptedByOtherCleaner",
    },
    inProgress: {
      value: "inProgress",
    },
    canceledByCleaner: {
      value: "canceledByCleaner",
    },
    canceledByHost: {
      value: "canceledByHost",
    },
    paused: {
      value: "paused",
    },
    finished: {
      value: "finished",
    },
    available: {
      value: "available",
    },
    // created: {
    //   value: "created",
    // },
  },
});

const JobType = new GraphQLEnumType({
  name: "JobType",
  values: {
    FLEXIBLE: {
      value: "Flexible",
    },
    REGULAR: {
      value: "Regular",
    },
  },
});

module.exports = {
  JobStatus,
  JobType,
};
