require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51Lh43oSGo772D7ldXaGF2o06Q2LLsll4SKxnQQyKQiwT5Zk27GW02i5cTR8rB6N285tUY1fRreqOhOCJDQUHfuDb00oTP7qW0b"
);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
