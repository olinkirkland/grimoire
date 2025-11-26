import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import logRequest from './middleware/log-request';

export const origin = ['http://localhost:5173', 'https://olinkirk.land'];

dotenv.config();

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
// Retrieve the data for the given id
app.get('/', (req, res) => {
    const { body } = req;
});

// Create an entry in the database with the data provided, and return the id
app.post('/', (req, res) => {});

// Initialize Server
const server = createServer(app);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running on port', port);
});
