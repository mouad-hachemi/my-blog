import sqlite3 from 'sqlite3';
import { open } from "sqlite";
import path from 'path';

const __dirname = path.resolve();

export let db;

export async function initDb() {
    // Open database.
    db = await open({
        filename: path.join(__dirname, 'datastore', 'blog.sqlite'),
        driver: sqlite3.Database
    });

    await db.migrate({
        migrationsPath: path.join(__dirname, 'datastore', 'migrations'),
    });

}