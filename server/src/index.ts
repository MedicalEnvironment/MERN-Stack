import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose" ;
import cors from "cors";

import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(cors(
    {
        origin: "*",
    }
));
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {
    //TODO: fetch all decks adn send em back to user
    //1. how do we fetch the decks from mongo?
    const decks = await Deck.find();
    //2. how do we send back the array to the ui?
    res.json(decks);
})

app.post("/decks", async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}); 

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log('listening on port ${PORT}');
    app.listen(PORT);
});


