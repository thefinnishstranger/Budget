import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema({
  firstName: { type: String, required: true, minlength: 1, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 1, maxlength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  passwordHash: { type: String, required: true },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense"
    }
  ]
});

const Account = mongoose.model("Account", accountSchema, "Accounts");

export default Account;
