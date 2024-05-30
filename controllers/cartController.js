const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            cart = await cart.save();
        } else {
            cart = await Cart.create({
                userId: req.user.id,
                products: [{ productId, quantity }]
            });
        }

        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            cart.products = cart.products.filter(p => p.productId.toString() !== productId);
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ userId: req.user.id }, { products: [] });
        res.status(200).json({ message: 'Carrinho limpo com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
