const Razorpay = require("razorpay");//npm i razorpay 

exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});
// razorpay instance is needed first to integerate payment gateway 