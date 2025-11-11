import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PlanetSchema = new Schema({
    name: String,
    image: String,
    description: String,
    Poblation: Number,
    color: String,
})
const Planet= mongoose.model('Planet', PlanetSchema);
export default Planet;
