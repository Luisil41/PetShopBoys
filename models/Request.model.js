const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User'},
        shelterId: { type: mongoose.Types.ObjectId, ref: 'Shelter'},
        petId: { type: mongoose.Types.ObjectId, ref: 'Pet'},
    },
    { timestamps: true }
)

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;