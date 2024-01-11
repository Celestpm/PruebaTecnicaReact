// src/CharacterDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CharacterDetails.css'; // Archivo de estilos CSS

function CharacterDetails() {
  const { characterId } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    // Cargar los detalles del personaje usando el ID del personaje
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacterDetails(data))
      .catch((error) => console.error("Error fetching character details:", error));
  }, [characterId]);

  if (!characterDetails) {
    return <div>Cargando detalles del personaje...</div>;
  }

  const getStatusColor = () => {
    switch (characterDetails.status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <div className="character-details-container">
      <h2 className='namecharacter'>{characterDetails.name}</h2>
      <div className="character-card">
        <div className="image-container">
          <img src={characterDetails.image} alt={characterDetails.name} />
        </div>
        <div className="info-container">
          <p>ID: {characterDetails.id}</p>
          <p>Status: <span style={{ color: getStatusColor() }}>{characterDetails.status || 'Sin especificar'}</span></p>
          <p>Species: {characterDetails.species || 'Desconocido'}</p>
          <p>Type: {characterDetails.type || 'Desconocido'}</p>
          <p>Género: {characterDetails.gender}</p>
          <p>Origen: {characterDetails.origin.name}</p>
          <p>Ubicación: {characterDetails.location.name}</p>
          <p>Episodios: {characterDetails.episode.length}</p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
