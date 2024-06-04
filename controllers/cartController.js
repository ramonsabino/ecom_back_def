const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [{ product: productId, quantity }] });
    } else {
      const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
