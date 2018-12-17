const { GraphQLNonNull } = require('graphql')
const EventType = require('../types/event')
const EventInputType = require('../types/input/event')
const request = require("request")
const PORT = process.env.PORT || 5000

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: (root, { data }, { db: { Event } }) => {
    return new Promise((resolve, reject) => {
      data.date = new Date();
      const newEvent = new Event(data)

      newEvent
        .save()
        .then(data => {
          let channelName = "EVENT_CREATED";
          let payload = {
            id: data._id,
            name: data.name,
            date: data.date
          };
          
          request.post(
            `http://localhost:${PORT}/publish`,
            { json: { channel_name: channelName, data : payload },
              headers: {
              'Content-Type' : 'application/json'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(body)
                }
            }
          );

          resolve(data)
        })
        .catch(errors => reject(errors))
    })
  }
}
