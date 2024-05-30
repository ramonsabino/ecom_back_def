const User = require('../models/User');

exports.protect = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        req.user = await User.findById(req.session.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Não autorizado' });
    }
};
