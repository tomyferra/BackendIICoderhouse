import { Router } from 'express';
import Usuarios from "../models/users.models.js";
import Carts from "../models/carts.models.js";
import passport from 'passport';
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const router = Router();

router.get('/', async (req, res) => {
  const allUsers = await Usuarios.find();
  res.send(allUsers);
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('error al cerrar sesion')
    }
    res.redirect('/')
  })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/faillogin' }), async (req, res) => {
  const { email, password } = req.body
  if (!req.user) {
    return res.status(401).send({ status: "error", error: "usuario no autenticado" })
  }

  let token = jwt.sign({ email, password, role: req.user.role }, config.JWT_SECRET, { expiresIn: '1h' })
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
    age: req.user.age
  }

  res.status(200).send({ status: "success", message: "Login exitoso", token: token, user: req.session.user })
})

router.get('/faillogin', async (req, res) => {
  res.status(400).send({ error: 'error al iniciar sesion' })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/users/failregister' }), async (req, res) => {
  res.status(201).send('usuario registrado con exito')
})

router.get('/failregister', async (req, res) => {
  res.status(400).send({ error: 'error al registrar el usuario' })
})

router.delete('/', async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).send('email es requerido')
  }
  const user = await Usuarios.findOne({ email })
  if (!user) {
    return res.status(404).send('usuario no encontrado')
  }
  await Carts.deleteOne({ _id: user.cart })
  await Usuarios.deleteOne({ email })
  res.send('usuario eliminado con exito')
})


export default router;