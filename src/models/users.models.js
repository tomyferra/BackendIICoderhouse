import mongoose from "mongoose";

const collectionName = 'usuarios'

const collectionSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, default: 'user' }
})

const usuarios = mongoose.model(collectionName, collectionSchema)

export default usuarios