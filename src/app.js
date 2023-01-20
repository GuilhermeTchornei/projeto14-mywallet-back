import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const mongoClient = new MongoClient(process.env.databaseURL);
await mongoClient.connect();
const db = mongoClient.db();
console.log('database connected');

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try
    {
        const user = await db.collection('users').findOne({ email: email, password: password });
        if (user) return res.status(200).send(user);
        res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await db.collection("users").insertOne({
            name: name,
            email: email,
            password: password
        });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/transitions', async (req, res) => {
    try {
        const transitions = await db.collection('transitions').find().toArray();
        res.status(200).send(transitions);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/transitions', async (req, res) => {
    const { description, value, type } = req.body;

    try {
        await db.collection('transitions').insertOne({ description, value, type, date: dayjs().format('DD/MM') });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const port = 5000;
app.listen(port, () => console.log('server connected'));