import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { turso } from './datastore/db.js';
import adminRouter from './routes/admin.js';

// Set absolute path of the current working directory.
const __dirname = path.resolve();
// Load environment variables.
dotenv.config();

// Create app.
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

// Endpoints (Routes)
app.get('/', async (req, res) => {
    try {
        const { searchTerm, category } = req.query
        const queryResp = await turso.execute({
            sql: 'SELECT * FROM posts WHERE published = true AND category LIKE ? AND title LIKE ?',
            args: [category ? category : '%%', searchTerm ? `%${searchTerm}%` : '%%'],
        });
        const allPosts = queryResp.rows;
        res.render('index.ejs', { allPosts });
    } catch (error) {
        console.log(error.message);
        res.status(502);
    }
});

app.get("/post/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const queryResp = await turso.execute({
            sql: 'SELECT * FROM posts where _id = ?',
            args: [postId],
        });
        const post = queryResp.rows[0];
        return res.render('post-page', { post });
    } catch (error) {
        console.error(error.message);
        return res.status(500);
    }
});

app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});