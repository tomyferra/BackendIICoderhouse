import express from 'express';
import { Router } from 'express';
import Usuarios from "../models/users.models.js";
const router = Router();

router.get('/', async (req, res) => {
  const allUsers = await Usuarios.find();
  res.send(allUsers);
});

router.post('/login', (req, res) => {
  // Handle user login
  res.send('User Login');
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, role, cart } = req.body
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('todos los datos son requeridos')
    }

    const user = await Usuarios.findOne({email})
    if (user) {
        return res.status(400).send('ese email ya esta registrado')
    }

    // brypt encriptar la password

    console.log('registrando usuario...')
    await Usuarios.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: password
    })
    res.status(201).send('usuario registrado con exito')
})




export default router;