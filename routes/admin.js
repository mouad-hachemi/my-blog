import express from "express";
import multer from "multer";
import { turso } from "../datastore/db.js";
import verifyAdmin from "../middlewares/authZ.js";

const adminRouter = express.Router();
const upload = multer();

adminRouter.use(verifyAdmin)

// Admin Home Page
adminRouter.get("/", async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const queryResp = await turso.execute({
            sql: 'SELECT * FROM posts WHERE title LIKE ?',
            args: [searchTerm ? `%${searchTerm}%` : '%%'],
        });
        const allPosts = queryResp.rows;
        res.render("admin.ejs", { allPosts });
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
        const { title, content, category, thumbnail } = req.body;
        const { lastInsertRowid } = await turso.execute({
            sql: 'INSERT INTO posts (title, content, category, thumbnail_url) VALUES (:title, json(:content), :category, :thumbnail)',
            args: {
                title,
                content,
                category,
                thumbnail,
            }
        });
        res.status(201).json({ message: 'تم حفظ المنشور بنجاح', flag: true, id: lastInsertRowid.toString() });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'خطأ في حفظ المنشور', flag: false });
    }
});

adminRouter.get('/edit-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const queryResp = await turso.execute({
            sql: 'SELECT * FROM posts WHERE _id = ?',
            args: [postId],
        });
        const post = queryResp.rows[0];
        res.render("admin-edit-post.ejs", { post });
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

adminRouter.put('/edit-post/:id', upload.none(), async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, category, thumbnail } = req.body;
        await turso.execute({
            sql: 'UPDATE posts SET title = :title, content = :content, category = :category, thumbnail_url = :thumbnail, updated_at = unixepoch() WHERE _id = :id',
            args: {
                title,
                content,
                category,
                thumbnail,
                id: postId,
            }
        });
        res.status(201).json({ message: "تم تحديث المنشور بنجاح", flag: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "خطأ في تحديث المنشور بنجاح", flag: false });
    }
});

adminRouter.put('/edit-post/publish/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await turso.execute({
            sql: 'UPDATE posts SET published = true WHERE _id = ?',
            args: [postId],
        });
        res.status(201).json({ message: 'تم النشر بنجاح ', flag: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "حدث خطأ في النشر", flag: false })
    }
});

adminRouter.put('/edit-post/hide/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await turso.execute({
            sql: 'UPDATE posts SET published = false WHERE _id = ?',
            args: [postId],
        });
        res.status(201).json({ message: 'تم إخفاء المنشور بنجاح ', flag: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "لم يمكن إخفاء المنشور", flag: false })
    }
});

adminRouter.delete('/delete-post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await turso.execute({
            sql: 'DELETE FROM posts WHERE _id = ?',
            args: [postId],
        });
        res.status(201).json("Post Deleted!");
    } catch (error) {
        console.error(error.message);
        return res.status(500)
    }
});

export default adminRouter;