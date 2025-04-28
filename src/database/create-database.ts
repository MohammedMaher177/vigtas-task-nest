import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';

dotenv.config();

async function createDatabase() {
    const connection = await createConnection({
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const databaseName = process.env.DB_NAME;

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
    console.log(`Database "${databaseName}" is ready ✅`);
    await connection.end();
}

createDatabase().catch((err) => {
    console.error('Error creating database:', err);
    process.exit(1);
});
