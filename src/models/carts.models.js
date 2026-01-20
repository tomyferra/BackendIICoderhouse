import mongoose from "mongoose";

const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    id: String,
    products: Array,
    user: String,
})

const cart = mongoose.model(collectionName, collectionSchema)

export default cart