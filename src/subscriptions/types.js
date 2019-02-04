const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean,
  } = require("graphql");

  const { JobStatus, JobType } = require("./jobEnumType");

const location = new GraphQLObjectType({
  name: "location",
  fields: {
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    },
  },
});

const jobReportItem = new GraphQLObjectType({
  name: "jobReportItem",
  fields: {
    note: {
      type: GraphQLString,
    },
    pictureIdentifier: {
      type: GraphQLString,
    },
  },
});

const verificationPhotoFields = new GraphQLObjectType({
    name: "verificationPhotoFields",
    fields: {
      id: {
        type: GraphQLID,
      },
      stepTitle: {
        type: GraphQLString,
      },
      pictureIdentifier: {
        type: GraphQLString,
      },
      date: {
        type: GraphQLString,
      },
    },
});

const additionalReportFields = new GraphQLObjectType({
  name: "additionalReportFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    stepId: {
      type: GraphQLID,
    },
    stepTitle: {
      type: GraphQLString,
    },
    checklistId: {
      type: GraphQLID,
    },
    checklistTitle: {
      type: GraphQLString,
    },
    report: {
      type: new GraphQLList(jobReportItem),
    },
    date: {
      type: GraphQLString,
    },
  },
});

const bedConfiguration = new GraphQLObjectType({
  name: "bedConfiguration",
  fields: {
    id: {
      type: GraphQLID,
    },
    type: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    quantity: {
      type: GraphQLFloat,
    },
  },
});

const dynamicAttribute = new GraphQLObjectType({
  name: "dynamicAttribute",
  fields: {
    id: {
      type: GraphQLID,
    },
    group: {
      type: GraphQLString,
    },
    label: {
      type: GraphQLString,
    },
    value: {
      type: new GraphQLList(GraphQLString),
    },
    pictures: {
      type: new GraphQLList(GraphQLString),
    },
  },
});

const progressSummaryFields = new GraphQLObjectType({
  name: "progressSummaryFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    actualStartTime: {
      type: GraphQLString,
    },
    actualEndTime: {
      type: GraphQLString,
    },
    startLocation: {
      type: location,
    },
    endLocation: {
      type: location,
    },
    completedTaskCount: {
      type: GraphQLInt,
    },
    problemCount: {
      type: GraphQLInt,
    },
    additionalReportCount: {
      type: GraphQLInt,
    },
    verificationPictureCount: {
      type: GraphQLInt,
    },
    hasNewFeedback: {
      type: GraphQLBoolean,
    },
  },
});

const userFields = new GraphQLObjectType({
  name: "userFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    profileId: {
      type: GraphQLID,
    },
    pictureIdentifier: {
      type: GraphQLString,
    },
    countryCode: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});

const propertyDetailFields = new GraphQLObjectType({
  name: "propertyDetailFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    wifiPassword: {
      type: GraphQLString,
    },
    wifiName: {
      type: GraphQLString,
    },
    wifiInformation: {
      type: GraphQLString,
    },
    garbageInformation: {
      type: GraphQLString,
    },
    information: {
      type: GraphQLString,
    },
    parkingInformation: {
      type: GraphQLString,
    },
    accessInformation: {
      type: GraphQLString,
    },
    numberOfBathrooms: {
      type: GraphQLFloat,
    },
    numberOfBedrooms: {
      type: GraphQLFloat,
    },
    numberOfBeds: {
      type: GraphQLInt,
    },

    bedConfigurations: {
      type: new GraphQLList(bedConfiguration),
    },
    dynamicAttributes: {
      type: new GraphQLList(dynamicAttribute),
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
  },
});

const propertyFields = new GraphQLObjectType({
  name: "propertyFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    owner: {
      type: userFields,
    },
    pictureIdentifier: {
      type: GraphQLString,
    },
    location: {
      type: location,
    },
    timeZone: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    apartment: {
      type: GraphQLString,
    },
    street: {
      type: GraphQLString,
    },
    zip: {
      type: GraphQLString,
    },
    details: {
      type: propertyDetailFields,
    },
    countryCode: {
      type: GraphQLString,
    },
    currencyCode: {
      type: GraphQLString,
    },
    zoomLevel: {
      type: GraphQLFloat,
    },
  },
});

const jobFields = new GraphQLObjectType({
  name: "jobFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    duration: {
      type: GraphQLFloat,
    },
    scheduledStartTime: {
      type: GraphQLString,
    },
    scheduledEndTime: {
      type: GraphQLString,
    },
    startTimeType: {
      type: JobType,
    },
    totalTaskCount: {
      type: GraphQLInt,
    },
    totalChecklistCount: {
      type: GraphQLInt,
    },
    totalVerificationPictureCount: {
      type: GraphQLInt,
    },
    offeredPrice: {
      type: GraphQLFloat,
    },
    note: {
      type: GraphQLString,
    },
    sentOn: {
      type: GraphQLString,
    },
  },
});

const cleanerFields = new GraphQLObjectType({
  name: "cleanerFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    status: {
      type: JobStatus,
    },
    contactId: {
      type: GraphQLID,
    },
    note: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    },
    companyName: {
      type: GraphQLString,
    },
    userData: {
      type: userFields,
    },
  },
});

const problemFields = new GraphQLObjectType({
  name: "problemFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    stepTitle: {
      type: GraphQLString,
    },
    checklistId: {
      type: GraphQLID,
    },
    checklistTitle: {
      type: GraphQLString,
    },
    note: {
      type: GraphQLString,
    },
    pictureIdentifiers: {
      type: new GraphQLList(GraphQLString),
    },
    severity: {
      type: GraphQLFloat,
    },
    date: {
      type: GraphQLString,
    },
  },
});

const taskFields = new GraphQLObjectType({
  name: "taskFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    icon: {
      type: GraphQLString,
    },
    note: {
      type: GraphQLString,
    },
    notePictureIdentifiers: {
      type: new GraphQLList(GraphQLString),
    },
    isComplete: {
      type: GraphQLBoolean,
    },
    completedOn: {
      type: GraphQLString,
    },
    centerX: {
      type: GraphQLFloat,
    },
    centerY: {
      type: GraphQLFloat,
    },
  },
});

const stepFields = new GraphQLObjectType({
  name: "stepFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    pictureIdentifier: {
      type: GraphQLString,
    },
    note: {
      type: GraphQLString,
    },
    room: {
      type: GraphQLString,
    },
    section: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    isComplete: {
      type: GraphQLBoolean,
    },
    isVerificationRequired: {
      type: GraphQLBoolean,
    },
    isVerificationComplete: {
      type: GraphQLBoolean,
    },
    tasks: {
      type: new GraphQLList(taskFields),
    },
    incompleteTaskCount: {
      type: GraphQLInt,
    },
  },
});

const checklistFields = new GraphQLObjectType({
  name: "checklistFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    type: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    pictureIdentifier: {
      type: GraphQLString,
    },
    totalTaskCount: {
      type: GraphQLInt,
    },
    totalVerificationPictureCount: {
      type: GraphQLInt,
    },
    steps: {
      type: new GraphQLList(stepFields),
    },
    doneTaskCount: {
      type: GraphQLInt,
    },
    doneStepCount: {
      type: GraphQLInt,
    },
    verificationPhotos: {
      type: new GraphQLList(verificationPhotoFields),
    },
    propertyIndependent: {
      type: GraphQLBoolean,
    },
  },
});

const bookingFields = new GraphQLObjectType({
  name: "bookingFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    partner: {
      type: GraphQLString,
    },
    guestName: {
      type: GraphQLString,
    },
    numberOfGuests: {
      type: GraphQLFloat,
    },
    arrivalDate: {
      type: GraphQLString,
    },
    departureDate: {
      type: GraphQLString,
    },
    nextArrivalDate: {
      type: GraphQLString,
    },
    dynamicAttributes: {
      type: new GraphQLList(dynamicAttribute),
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    bedConfigurations: {
      type: new GraphQLList(bedConfiguration),
    },
  },
});

const senderFields = new GraphQLObjectType({
  name: "senderFields",
  fields: {
    id: {
      type: GraphQLID,
    },
    companyName: {
      type: GraphQLString,
    },
    userData: {
      type: userFields,
    },
  },
});

module.exports = {
    location,
    additionalReportFields,
    bedConfiguration,
    dynamicAttribute,
    progressSummaryFields,
    propertyFields, 
    userFields,
    jobFields, 
    cleanerFields,
    problemFields,
    checklistFields,
    bookingFields,
    senderFields 
};