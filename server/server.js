// This is your test secret API key.
const stripe = require("stripe")(
  "pk_test_51OyuQMJY2oOkVHhlvJzAASnmxDjyE3qOYYj8e98OL8XZNfIffQWed46BnIfLcqEuC11QTs6nni78ZBmTfcBNVbNT0037ZwsqRQ"
);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
const YOUR_DOMAIN = "http://localhost:4242";

app.post("/checkout", async (req, res) => {
  const products = req.body.item.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: item.qty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [...products],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);
  npm;
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

app.listen(4242, () => console.log("Running on port 4242"));
