const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: { type: String, required: true },
    date_added: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
})

MessageSchema.virtual('url').get(function() {
    return `/message/${this.id}`;
})

module.exports = mongoose.model("Message", MessageSchema);