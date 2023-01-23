import db from "../Config/database.js";
import dayjs from 'dayjs';

export async function getTransitions(req, res){
    try {
        const transitions = await db.collection('transitions').find({userID: res.locals.session.userID}).toArray();
        res.status(200).send(transitions);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postTransition(req, res){
    const { description, value, type } = req.body;

    try {
        await db.collection('transitions').insertOne({ description, value, type, date: dayjs().format('DD/MM'), userID: res.locals.session.userID });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}