const Usuario = require('../models/Usuario');
const authMiddleware = require('./authMiddleware');
const roleMiddleware = require('./roleMiddleware');

// Creating users is an ADMIN-only action. The only exception is an empty
// database: nobody can log in yet, so the first user must be creatable
// without a token (this is how the initial ADMIN is bootstrapped).
const adminOrFirstUserMiddleware = async (req, res, next) => {
    try {
        const total = await Usuario.countDocuments();

        if (total === 0) {
            return next();
        }
    } catch (error) {
        return next(error);
    }

    return authMiddleware(req, res, (error) => {
        if (error) {
            return next(error);
        }

        return roleMiddleware('ADMIN')(req, res, next);
    });
};

module.exports = adminOrFirstUserMiddleware;
