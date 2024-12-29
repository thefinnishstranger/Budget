import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Account from "../schemas/AccountSchema.js";

const accountRouter = express.Router();

// Login route
accountRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET || "default_secret", {
      expiresIn: "1h",
    });

    res.status(200).send({
      token,
      email: user.email,
      name: user.firstName,
      userId: user._id
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Register route
accountRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newAccount = new Account({
      firstName,
      lastName,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });

    const savedAccount = await newAccount.save();
    res.status(201).json({ message: "Account created successfully", account: savedAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

accountRouter.get("/accounts", async (request, response) => {
    try {
        const accounts = await Account.find({}, { passwordHash: 0 });
        response.status(200).json(accounts);
    } catch (error) {
        console.error("error fetching accounts", error);
        res.status(500).json({ error: "something went wrong" })
    }
})

export default accountRouter;
