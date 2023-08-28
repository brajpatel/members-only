const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        minLength: 5,
        maxLength: 20,
        unique: true,
        index: {
            collation: { locale: "en", strength: 2 }
        },
        required: true
    },
    display_name: { type: String, minLength: 3, required: true },
    password: { type: String, minLength: 6, required: true },
    account_status: { type: String, enum: ["none", "member", "admin"], default: "none" },
    profile_picture: { data: Buffer, contentType: String }
})

module.exports = mongoose.model("User", UserSchema);