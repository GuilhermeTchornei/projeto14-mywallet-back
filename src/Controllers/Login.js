import db from "../Config/database.js";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';


export async function SignIn(req, res){
    const { email, password } = req.body;

    try
    {
        const user = await db.collection('users').findOne({ email });
        if (!user) return res.status(400).send("Usuário e/ou senha incorretos!");
        
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) return res.status(400).send("Usuário e/ou senha incorretos!");

        const token = uuid();
        await db.collection('sessions').insertOne({userID: user._id, token});

        res.status(200).send({ name: user.name, userID: user._id, token});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function SignUp(req, res){
    const { name, email, password } = req.body;

    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
        await db.collection("users").insertOne({
            name: name,
            email: email,
            password: passwordHashed
        });
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}