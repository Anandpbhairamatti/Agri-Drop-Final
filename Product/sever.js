const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_xeNax3TIPVfHw8',
    key_secret: 'your_razorpay_key_secret',
});

app.post('/refund', async (req, res) => {
    const { amount } = req.body;

    try {
        const payment = await razorpay.payments.capture('payment_id', amount);
        const refund = await razorpay.payments.refund(payment.id, {
            amount: amount,
        });

        res.status(200).json({ success: true, refund });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
