import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { title } from 'process';

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
    const allPosts = [
        {
            title: 'منشور 1',
            content: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم.لأنه مازال نصاً بديلاً ومؤقتاً.',
        },
        {
            title: 'منشور 2',
            content: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم.لأنه مازال نصاً بديلاً ومؤقتاً.',
        },
        {
            title: 'منشور 3',
            content: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم.لأنه مازال نصاً بديلاً ومؤقتاً.',
        }

    ];
    res.render('index.ejs', { allPosts });
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});