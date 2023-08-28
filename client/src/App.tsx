import React, { useEffect, useState } from "react";
import './App.css';

type TDeck = {
  title: string;
  _id: string;
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) 
  {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/decks', {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    //refetch all my todo items
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
  <div className="App">
    <ul className="decks">
      {
        decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            {deck.title}
            </li>
        ))}
      </ul>
    <form onSubmit={handleCreateDeck} >
      <label htmlFor="deck-title">Deck Title</label>
      <input
       id="deck-title"
       value={title} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}     
        />
        <button>Create Deck</button>
      </form>
  </div>
  );
}

export default App;
