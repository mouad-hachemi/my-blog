import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { db, initDb } from './datastore/db.js';
import adminRouter from './routes/admin.js';

// Set absolute path of the current working directory.
const __dirname = path.resolve();
// Load environment variables.
dotenv.config();

// Create app.
(async () => {
    // Initialize database
    await initDb();

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')))
    app.set('view engine', 'ejs');

    const PORT = process.env.PORT;

    // Endpoints (Routes)
    app.get('/', async (req, res) => {
        const allPosts = await db.all('SELECT * FROM posts');
        res.render('index.ejs', { allPosts });
    });

    app.use('/admin', adminRouter);

    app.listen(PORT, () => {
        console.log('http://localhost:' + PORT);
    });
})();