import db from "../Config/database.js";
import dayjs from 'dayjs';
import transitionSchema from "../Model/TransitionsSchema.js";

export async function getTransitions(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

    
        const transitions = await db.collection('transitions').find({userID: session.userID}).toArray();
        res.status(200).send(transitions);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postTransition(req, res){
    const { description, value, type } = req.body;
    const { authorization } = req.headers;
    
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    const { error } = transitionSchema.validate({description, value, type}, {abortEarly: false});
    if(error){
        const errorMessages = error.details.map(e => e.message);
        console.log(errorMessages);
        return res.status(422).send(errorMessages);
    }


    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

        await db.collection('transitions').insertOne({ description, value, type, date: dayjs().format('DD/MM'), userID: session.userID });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}