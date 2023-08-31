const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    display_name: { type: String, minLength: 3, required: true },
    password: { type: String, minLength: 6, required: true },
    account_status: { type: String, enum: ["none", "member", "admin"], default: "none" },
    profile_picture: { type: String }
})

UserSchema.virtual('url').get(function() {
    return `/user/${this.id}`;
})

module.exports = mongoose.model("User", UserSchema);