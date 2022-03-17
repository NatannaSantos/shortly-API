import { connection } from "../database.js";
import {v4 as uuid} from 'uuid';

export async function shortenUrl(req,res){
    const url=req.body;
    console.log(url);

    try {

        const shortUrl= uuid();
        const newUrl=shortUrl.slice(0,8);
        await connection.query(`
        INSERT INTO 
        urls(url) 
        VALUES ($1)
        `,[url]);
        console.log("shorURL"+newUrl);
        res.status(201).send(`shortUrl:${newUrl}`);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}