import express from "express";
import { db } from "../datastore/db.js";

const adminRoute = express.Router();

// Admin Home Page
adminRoute.get("/", (req, res) => {
    res.send("Admin Home Page")
});

adminRoute.post('/add-post', async (req, res) => {
    try {
        const { title, content } = req.body;
        await db.run('INSERT INTO posts (title, content) VALUES (:title, :content)', {
            ':title': title,
            ':content': content,
        });
        res.status(201).json("Post Added!");
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

adminRoute.put('/edit-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;
        await db.run(
            'UPDATE posts SET title = ?, content = ? WHERE _id = ?',
            title,
            content,
            postId
        );
        res.status(201).json("Post Updated!");
    } catch (error) {
        console.error(error.message);
    }
});

export default adminRoute;