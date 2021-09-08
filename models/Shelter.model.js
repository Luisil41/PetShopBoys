const mongoose = require('mongoose');
const { Schema } = mongoose;

const shelterSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: false },
        password: { type: String, required: true },
        address: { type: String, required: true },
        description: { type: String },
        avatar: { type: String },
        phone: { type: String },
        pets: [{ type: mongoose.Types.ObjectId, ref: 'Pets'}],
        images: [{ type: String }]
    },
    { timestamps: true }
)

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;