import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import logRequest from './middleware/log-request';
import { createDataEntry, createTable, getDataBySemanticId } from './database/db-helpers';

export const origin = ['http://localhost:5173', 'https://olinkirk.land'];

async function main() {
    dotenv.config();

    // Initialize Database
    await createTable();

    // Initialize REST server
    const app = express();

    app.use(express.json());
    app.use(logRequest);
    app.use(
        cors({
            origin,
            credentials: true
        })
    );

    // Routes
    // Create an entry in the database with the data provided, and return the id
    app.post('/', (req, res) => {
        const { body } = req;
        // Ensure the body is a string, and no longer than 2048 characters
        const semanticId = createDataEntry(body);
        return res.status(201).json({ semanticId });
    });

    // Retrieve the data for the given id
    app.get('/:semanticId', (req, res) => {
        const { semanticId } = req.params;
        const data = getDataBySemanticId(semanticId);
        if (data === null) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json({ data });
    });

    // Initialize Server
    const server = createServer(app);

    // Start the server
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log('Server running on port', port);
    });
}

main().catch((err) => {
    console.error('Failed during main loop:', err);
    process.exit(1);
});
