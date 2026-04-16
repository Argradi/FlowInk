const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const { isAuthenticated } = require("../middleware/jwt.middleware");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', isAuthenticated, (req, res, next) => {
    const { tattooId, title, price, image } = req.body;

    if (!title || !price) {
        return res.status(400).json({ message: "Faltan datos del producto (título o precio)" });
    }

    stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: title,
                        images: image && image.startsWith('http') ? [image] : [],
                        description: `Diseño exclusivo de tatuaje: ${title}`,
                    },
                    unit_amount: Math.round(price * 100), 
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/payment-success?id=${tattooId}`,
        cancel_url: `${process.env.ORIGIN}/tattoo-details/${tattooId}`,
    })
    .then((session) => {
        res.json({ url: session.url });
    })
    .catch((error) => {
        console.error('Error detallado de Stripe:', error);
        res.status(500).json({ 
            message: 'Error al procesar el pago con Stripe',
            error: error.message 
        });
    });
});

module.exports = router;