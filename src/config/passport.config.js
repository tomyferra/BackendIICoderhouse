import passport from "passport";
import local from "passport-local";
import Usuarios from "../models/users.models.js";
import Carts from "../models/carts.models.js";
import { hashPassword, isValidPassword } from "../utils/utils.js";
import jwt from "passport-jwt";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null
    if (req && req.headers) {
        token = req.headers.authorization.split(' ')[1]
    }
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'tomasferraribackend2'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body
        try {
            let user = await Usuarios.findOne({ email: username })
            if (user) {
                return done(null, false, { message: 'El usuario ya existe' })
            }
            const newCart = await Carts.create({ user: email, products: [] })
            const newUser = await Usuarios.create({
                first_name: first_name,
                last_name: last_name,
                email: username,
                age: age,
                password: hashPassword(password),
                role: role || 'user',
                cart: newCart._id
            })
            return done(null, newUser)
        } catch (error) {
            return done("Error al registrar el usuario" + error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await Usuarios.findOne({ email: username })
            if (!user) {
                return done(null, false, { message: 'El usuario no existe' })
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
            return done(null, user)
        } catch (error) {
            return done("Error al iniciar sesion" + error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await Usuarios.findById(id)
        done(null, user)
    })
}

export default initializePassport