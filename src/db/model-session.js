const mongoose = require('./connection');

const collection = "_Session";
const schema = mongoose.Schema(
  {
    _id: {
      type: String,
      alias: "id",
      required: true,
    },
    _session_token: {
      type: String,
      alias: "sessionToken",
    },
    // This token allows for us to present a token that can be used to identify the user
    // and safely passed to other systems but does not have the power to unlock the users session / credential
    externalSessionToken: String,
    installationId: String,
    restricted: Boolean,
    expiresAt: Date,
    createdWith: {
      action: String,
      authProvider: String,
    },
    _created_at: {
      type: Date,
      alias: "createdAt",
    },
    _updated_at: {
      type: Date,
      alias: "updatedAt",
    },
    _p_user: {
      type: String,
      alias: "userId",
    },
  },
  {
    versionKey: false
  },
);

const Session = mongoose.model(collection, schema, collection);

module.exports = {
  Session
};
