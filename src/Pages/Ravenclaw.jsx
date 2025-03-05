import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import styles from './Ravenclaw.module.css';

function Ravenclaw() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 9; 

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters/house/ravenclaw')
            .then(response => response.json())
            .then(data => setCharacters(data));
    }, []);

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const totalPages = Math.ceil(characters.length / charactersPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className={styles['character-grid']}>
                {currentCharacters.map(character => (
                    <CharacterCard 
                        key={character.id} 
                        character={character} 
                        className={styles['character-card']} 
                        details={<p><strong>Species:</strong> {character.species}</p>} 
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage}>Anterior</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage}>Siguiente</button>
            </div>
        </div>
    );
}

export default Ravenclaw;