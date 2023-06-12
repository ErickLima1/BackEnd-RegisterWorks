//Carretgando Modulos
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/registerModels');
const connection = require('../models/connection');

//Configurando o passport e definir a estrategia de autenticação se der certo é GOD
passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha'}, async (email, senha, done) => {
    try {

        //busca e retorna um objeto do usuário correspondente ao email
        const query = 'SELECT * FROM registrar WHERE email = ?';
        const [rows] = await connection.execute(query, [email]);
        const user = rows[0];
        
        if(!user) {
            console.log('Email Usuario', email); //deletar
            return done(null, false, {message: 'Email Não Encontrando.'});
        }

        //bcrypt compare senha
        const isSenha = await bcrypt.compare(senha, user.senha);
        if(!isSenha) {
            // console.log('Senha do usuário:', user.senha); //Deletar
            // console.log('Senha fornecida:', senha); //Deletar
            
            return done(null, false, {message: 'Senha Incorreta'});
        }

        return done(null, user);

    } catch(error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);

});

passport.deserializeUser( async(id, done) => {
    try{
        const user = await User.findByIdUser(id);
        done(null, user);
        
    }catch(error) {
        done(error);
    }

});

//exports para usar em outro lugar
module.exports = passport;