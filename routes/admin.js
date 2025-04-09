import express, { json } from "express";
import multer from "multer";
import { db } from "../datastore/db.js";

const adminRouter = express.Router();
const upload = multer();

// Admin Home Page
adminRouter.get("/", async (req, res) => {
    try {
        const allPosts = await db.all("SELECT * FROM posts");
        res.render("admin.ejs", { allPosts })
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

adminRouter.get('/new-post', async (req, res) => {
    try {
        res.render('admin-new-post.ejs')
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

adminRouter.post('/new-post', upload.none(), async (req, res) => {
    try {
        const { title, content } = req.body;
        await db.run('INSERT INTO posts (title, content) VALUES (:title, json(:content))', {
            ':title': title,
            ':content': content,
        });
        res.status(201).json({ message: 'تم حفظ المنشور بنجاح', flag: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'خطأ في حفظ المنشور', flag: false });
    }
});

adminRouter.get('/edit-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await db.get('SELECT * FROM posts WHERE _id = :id', {
            ':id': postId,
        });
        res.render("admin-edit-post.ejs", { post });
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

adminRouter.put('/edit-post/:id', upload.none(), async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;
        await db.run(
            'UPDATE posts SET title = ?, content = ? WHERE _id = ?',
            title,
            content,
            postId
        );
        res.status(201).json({ message: "تم تحديث المنشور بنجاح", flag: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "خطأ في تحديث المنشور بنجاح", flag: false });
    }
});


adminRouter.delete('/delete-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await db.run(
            'DELETE FROM posts WHERE _id = ?',
            postId
        );
        res.status(201).json("Post Deleted!");
    } catch (error) {
        console.error(error.message);
        return res.status(500)
    }
});

export default adminRouter;