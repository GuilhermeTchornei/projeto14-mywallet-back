import db from "../Config/database.js";

export async function authToken(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const session = await db.collection('sessions').findOne({token});
        if(!session) return res.sendStatus(401);

        res.locals.session = session;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}