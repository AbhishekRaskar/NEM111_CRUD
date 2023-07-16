const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: { type: String, require: true },
    pass: { type: String, require: true },
    name: { type: String, require: true },
    age: { type: Number, require: true },
}, {
    versionKey: false
})

const userModel = mongoose.model("user", userSchema)


module.exports = {
    userModel
}