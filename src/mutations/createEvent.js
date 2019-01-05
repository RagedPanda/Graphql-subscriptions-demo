const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql')
//const EventType = require('../types/event')
const EventInputType = require('../types/input/event')
//const request = require("request")
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1"});
//const PORT = process.env.PORT || 5000

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const QueueUrl = "https://sqs.us-east-1.amazonaws.com/401763998567/job-events";

const response = new GraphQLObjectType({
  name: "response",
  fields: {
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }
});

module.exports = {
  type: response,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: (root, { data }, { db: { Event } }) => {
    return new Promise((resolve, reject) => {
      data.date = new Date();
      const newEvent = new Event(data);

      newEvent
        .save()
        .then(data => {
          let channelName = "EVENT_CREATED";
          let payload = {
            id: data._id,
            name: data.name,
            date: data.date
          };

          var params = {
            MessageBody: JSON.stringify(payload),
            QueueUrl
           };

           //console.log(JSON.stringify(process.env));

           sqs.sendMessage(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data.MessageBody);
            }
          });
          
          // request.post(
          //   `http://localhost:5000/publish`,
          //   { json: { channel_name: channelName, data : payload },
          //     headers: {
          //     'Content-Type' : 'application/json'
          //   }},
          //   function (error, response, body) {
          //       if (!error && response.statusCode == 200) {
          //           console.log("success")
          //       }
          //   }
          // );

          //console.log(request);

          resolve({
            status: "sucess",
            createdAt: new Date()
          })
        })
        .catch(errors => reject(errors))
    })
  }
}
