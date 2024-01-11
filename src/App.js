// src/App.js

import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CharacterDetails from './CharacterDetails';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCharacters = () => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.info.pages);
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Cargar personajes cuando la página se monta por primera vez
    loadCharacters();
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Cargar más personajes cuando el usuario llega al final de la página
      if (scrollY + windowHeight >= documentHeight - 20) {
        loadCharacters();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Limpiar el event listener al desmontar el componente
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Añadido loading a las dependencias para evitar llamadas adicionales

  return (
    <div className="App">
      <h1 className="title">Personajes de Rick and Morty</h1>

      <Routes>
        <Route
          path="/character/:characterId"
          element={<CharacterDetails />}
        />
        <Route
          path="/"
          element={
            <div>
              <div className="card-container">
                {characters.map((character) => (
                  <div key={character.id} className="card">
                    <div className="imgdiv">
                      {/* Enlace a la nueva página de detalles */}
                      <Link to={`/character/${character.id}`}>
                        <img src={character.image} alt={character.name} />
                      </Link>
                    </div>
                    <div className="card-info">
                      <h3>{character.name}</h3>
                      <p>Especie: {character.species}</p>
                    </div>
                  </div>
                ))}
              </div>

              {page <= totalPages && (
                <button className="load-more-button" onClick={loadCharacters} disabled={loading}>
                  Cargar más personajes
                </button>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
