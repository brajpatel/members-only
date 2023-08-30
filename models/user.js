const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    display_name: { type: String, minLength: 3, required: true },
    password: { type: String, minLength: 6, required: true },
    account_status: { type: String, enum: ["none", "member", "admin"], default: "none" },
    profile_picture: { data: Buffer, contentType: String }
})

UserSchema.virtual("profile_picture_url").get(function() {
    if(!this.profile_picture.data) return '';

    return `data:${this.profile_picture.contentType};base64,${this.profile_picture.data.toString("base64")}`;
})

module.exports = mongoose.model("User", UserSchema);