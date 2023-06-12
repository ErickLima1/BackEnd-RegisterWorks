const passport = require('../middlewares/passportValidations');

//Definir a logica para login do usúario.
const controllerLogin = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(401).json({message: info.message});
        }
        
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = controllerLogin;