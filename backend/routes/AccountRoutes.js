import express from "express";
import Account from "../schemas/AccountSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accountRouter = express.Router();

accountRouter.get("/", async (request, response) => {
    const accounts = await Account.find({});
    response.json(accounts.map((account) => account.toJSON()));
});

accountRouter.post("/login", async (request, response) => {
    const { username, password } = request.body;
    const user = Account.findOne({ username });
    console.log("found user: ", user);
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);
    console.log("password correct", passwordCorrect);
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60
    })

    response
        .status(200)
        .send({ token, username: user.username, name: user.firstName })
})

accountRouter.post("/", async (request, response) => {
    const { firstName, lastName, username, password } = request.body;

    try {
        const existing = await Account.findOne({ username });
        if (existing) {
            return response.status(400).json({ error: "username already exists" });
        }

        const newAccount = new Account({
            firstName,
            lastName,
            username,
            passwordHash: password
        })

        const savedAcount = await newAccount.save();
        response.status(201).json({ message: "account created successfully", account: savedAcount });
    } catch (error) {
        console.error("error creating account", error);
        response.status(500).json({ error: "something went wrong" });
    }
})

export default accountRouter;
