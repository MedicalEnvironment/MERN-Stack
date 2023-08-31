import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";
import { useParams } from 'react-router-dom';
import { createCard } from "./api/createcard";
import './App.css';

export default function Deck() {
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  //async function handleDeleteDeck(deckId: string) {
  //  await deleteDeck(deckId);
  //  setDecks(decks.filter((deck) => deck._id !== deckId));
  //}

  //useEffect(() => {
  //  async function fetchDecks() {
  //    const newDecks = await getDecks();
  //    setDecks(newDecks);
  //  }
  //  fetchDecks();
  //}, []);

  return (
  <div className="App">
    {/* <ul className="decks"> 
        decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>

            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
        ))}
        </ul> */}
    <form onSubmit={handleCreateDeck} >
      <label htmlFor="card-text">Card Text</label>
      <input
       id="card-text"
       value={text} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}     
        />
        <button>Create Card</button>
      </form>
  </div>
  );
}

