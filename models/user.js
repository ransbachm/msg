const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }, 
    username : {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});
var User = mongoose.model("user", userSchema);
module.exports = User;