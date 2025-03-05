function CharacterCard({ character, className }) {
    const details = character.description ? (
      <p>{character.description}</p>
    ) : (
      <p><strong>Species:</strong> {character.species}</p>
    );
  
    return (
      <div className={className}> 
        <img src={character.image} alt={character.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
        <h2>{character.name}</h2>
        {details} {/* Mostrar la descripción o la especie */}
        {character.house && <p><strong>House:</strong> {character.house}</p>}
        {character.dateOfBirth && <p><strong>Date of Birth:</strong> {character.dateOfBirth}</p>}
        {character.ancestry && <p><strong>Ancestry:</strong> {character.ancestry}</p>}
        {character.patronus && <p><strong>Patronus:</strong> {character.patronus}</p>}
        {character.actor && <p><strong>Actor:</strong> {character.actor}</p>}
      </div>
    );
  }
  
  export default CharacterCard;