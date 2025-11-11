import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({

    name: String,
    image: String,
    description: String,
    kiBase: Number,
    FavoriteFood: String,
})
const Character= mongoose.model('Character', CharacterSchema);
export default Character; 

