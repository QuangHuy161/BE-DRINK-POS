const mongoose = require("mongoose")


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = mongoose.Schema(
    {
        fullname:{
            type: String,
            require: [true, "Please enter your name"]
        },
        password:{
            type:String,
            require: true
        },
	role:{
            type:String,
        }
    }
)

module.exports = userSchema;