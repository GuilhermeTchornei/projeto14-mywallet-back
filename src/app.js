import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';

const app = express();
app.use(express.json());

dotenv.config();
const mongoClient = new MongoClient(process.env.databaseURL);
await mongoClient.connect();
const db = mongoClient.db();
console.log('database connected');

app.get('/user', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (await db.collection('users').findOne({ email: email, password: password })) return res.sendStatus(200);
        res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.post('/user', async (req, res) => {
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