import dotenv from 'dotenv';
import path from 'path';
import express from 'express';

// Set absolute path of the current working directory.
const __dirname = path.resolve();
// Load environment variables.
dotenv.config();

// Create app.
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.render('index.ejs', {message: 'مرحبا بك على شاهين'});
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});