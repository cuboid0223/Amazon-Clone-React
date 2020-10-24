const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HfHVBJnmVgqsUJ5GX3A5VUpgVbaEH2gJilbyOeAADUKah1tCHkbVV6j8U2mgsBIHek4nD6m8xxtCPnlUUwySMqr00NsP9oekF"
);

//sk_test_51HfHVBJnmVgqsUJ5GX3A5VUpgVbaEH2gJilbyOeAADUKah1tCHkbVV6j8U2mgsBIHek4nD6m8xxtCPnlUUwySMqr00NsP9oekF

// API

// App config
const app = express();

// MiddleWares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
// app.get("/", (request, response) => response.status(200).send("hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd", // 
  });
  // 201 >>> Ok-Created
  response.status(201).send({
      clientSecret: paymentIntent.client_secret,
  })
});

// listen command

exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-d7a99/us-central1/api
