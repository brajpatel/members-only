const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: { type: String, required: true },
    date_added: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Message", MessageSchema);