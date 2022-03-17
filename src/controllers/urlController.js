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
        urls(url,shortUrl) 
        VALUES ($1,$2)
        `,[url.url,newUrl]);
        console.log("shorURL"+newUrl);
        res.status(201).send(`shortUrl:${newUrl}`);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrl(req,res){
    const {shortUrl}=req.params;
   
    try {
        const {rows:existingUrl}= await connection.query(`
        SELECT * FROM urls
        WHERE shortUrl=$1
        `,[shortUrl]);
        if (existingUrl.length === 0) {
            return res.sendStatus(404);
          }
       console.log(existingUrl)
        const returnUrl=existingUrl.map(returnUrl=>({
            "id":returnUrl.id,
            "shortUrl":returnUrl.shorturl,
            "url":returnUrl.url
        })
        );

        res.status(200).send(returnUrl);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}