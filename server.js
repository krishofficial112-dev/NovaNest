const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_R6PQ7RCD3thtwf",   // from your CSV
  key_secret: "uyYj8h22mfS6H2xmqxDom2b2" // from your CSV
});

// Create order
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
      notes: { service: req.body.service, comments: req.body.comments }
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Verify payment (optional endpoint)
app.post("/verify", (req, res) => {
  const crypto = require("crypto");
  const { order_id, payment_id, signature } = req.body;

  const hmac = crypto.createHmac("sha256", razorpay.key_secret);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    res.send("✅ Payment verified");
  } else {
    res.status(400).send("❌ Invalid signature");
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
