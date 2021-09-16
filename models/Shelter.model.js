const mongoose = require('mongoose');
const { Schema } = mongoose;

const shelterSchema = new Schema({
    role: { type: String, default: 'shelter' },
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    avatar: { type: String },
    phone: { type: String },
    province: { type: String, required: true },
    pets: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
    images: [{ type: String }],
    requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }]
}, { timestamps: true })

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;