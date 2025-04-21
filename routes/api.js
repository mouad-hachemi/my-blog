import express from "express";
import verifyAdmin from "../middlewares/authZ.js";
import dotenv from "dotenv";

// Load envrionment variables.
dotenv.config();

const apiRouter = express.Router();
apiRouter.use(verifyAdmin);

apiRouter.get("/github-credentials", (req, res) => {
    res.status(201).json({
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        owner: process.env.OWNER,
        repo: process.env.REPO,
    });
});

export default apiRouter;