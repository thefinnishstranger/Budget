import express from "express";
import Account from "../schemas/AccountSchema.js";
import jwt from "jsonwebtoken";

const accountRouter = express.Router();

accountRouter.get("/", async (request, response) => {
    const accounts = await Account.find({});
    response.json(accounts.map((account) => account.toJSON()));
});

export default accountRouter;
