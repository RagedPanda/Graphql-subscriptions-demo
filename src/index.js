require("dotenv").config();
const { createServer } = require("http")
const bodyParser = require("body-parser")
const express = require("express")
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { subscribe, execute } = require("graphql")
const schema = require("./schema")
const socket = require("./socket");
const { validateToken } = require("./authanticateUser");

const app = express();

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json())

app.post(
  "/graphql", (req, res) => { 
    graphqlExpress({ 
      schema
    })(req, res) 
  }
);

app.use(
  "/graphiql", (req, res) => {
    graphiqlExpress({
      endpointURL: "/graphql",
      subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
    })(req, res)
  }
);

const server = createServer(app)

server.listen(PORT, err => {
  if (err) throw err

  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => validateToken()
    },
    {
      server,
      path: "/subscriptions"
    }
  )

  console.log(`> Ready on PORT ${PORT}`)
})

app.post("/publish", (req, res) => {
  console.log("channel : ", req.body.channel_name);
  console.log("snapshot : ", req.body.snapshot);
  socket.publish(req.body.channel_name, {
    jobAggregateSnapshot : req.body.snapshot
  });
});
