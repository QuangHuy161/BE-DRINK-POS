const mongoose = require("mongoose")

const ReveuneSchema = mongoose.Schema(
    {
        doanhthu:Number,
        time:Date
    }
)

module.exports = ReveuneSchema