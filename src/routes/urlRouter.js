import { Router } from "express";
import { getUrl, shortenUrl}  from "../controllers/urlController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter=Router();

urlRouter.post('/urls/shorten',validateSchemaMiddleware(urlSchema),shortenUrl);
urlRouter.get('/urls/:shortUrl',getUrl);

export default urlRouter;