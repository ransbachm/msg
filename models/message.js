const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true,
        trim: true
    }, 
    creator : {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});
var User = mongoose.model("message", userSchema);
module.exports = User;