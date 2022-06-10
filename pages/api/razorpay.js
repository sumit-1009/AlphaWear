const Razorpay = require("razorpay");
const shortid = require("shortid");
// import Order from "../../models/Order"
// import connectDb from "../../middleware/mongoose"
import Order from '../../models/Order'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const payment_capture = 1;
    const amount = 10;
    const currency = "INR";
    const options = {
      amount: (amount * 100),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    
  }
}