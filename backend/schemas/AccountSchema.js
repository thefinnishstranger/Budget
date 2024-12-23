import mongoose from "mongoose";
const { Schema } = mongoose;

var accountSchema = new Schema({

    firstName: {
        type: String,
        min: 1,
        max: 20,
        required: true
    },
    lasttName: {
        type: String,
        min: 1,
        max: 20,
        required: true
    },
    username: {
        type: String,
        min: 3,
        max: 15,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 3,
        max: 15,
        required: true
    },

})

const Account = mongoose.model("Account", accountSchema, "Accounts");

export default Account;