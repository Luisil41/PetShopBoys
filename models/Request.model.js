const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    shelterId: { type: mongoose.Types.ObjectId, ref: 'Shelter' },
    petId: { type: mongoose.Types.ObjectId, ref: 'Pet' },
    message: { type: String },
    status: { type: String, enum: ['pendiente', 'denegada', 'aprobada'], default: 'pendiente'}
}, { timestamps: true })

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;