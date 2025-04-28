import { createConnection } from 'mysql2/promise';

async function createDatabase() {
    const connection = await createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'wk8tJSsz5QcmvbC!',
    });

    const databaseName = 'vigtas_task';

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
    console.log(`Database "${databaseName}" is ready ✅`);
    await connection.end();
}

createDatabase().catch((err) => {
    console.error('Error creating database:', err);
    process.exit(1);
});
