const passport = require('../middlewares/passportValidations');

//Definir a logica para login do usúario.
const controllerLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(401).json({message: info.message});
        }
        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }
            return res.json({message: 'Login Aprovado'});
            
        });
        
    })(req, res, next);
};

module.exports = controllerLogin;


