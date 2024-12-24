import mongoose from "mongoose";
const { Schema } = mongoose;

var accountSchema = new Schema({

    firstName: {
        type: String,
        min: 1,
        max: 20,
        required: true
    },
    lastName: {
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
    passwordHash: {
        type: String,
        required: true
    },

})

accountSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
})

const Account = mongoose.model("Account", accountSchema, "Accounts");

export default Account;