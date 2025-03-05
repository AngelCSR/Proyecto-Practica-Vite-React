import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import styles from './Gryffindor.module.css';

function Gryffindor() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 9;
    const [totalPages, setTotalPages] = useState(0); // Añadir estado para totalPages

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters/house/gryffindor')
            .then(response => response.json())
            .then(data => {
                setCharacters(data);
                setTotalPages(Math.ceil(data.length / charactersPerPage)); // Calcular totalPages aquí
            });
    }, [charactersPerPage]); // Añadir charactersPerPage como dependencia

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

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
                        className={styles['character-card']} // Añade esta línea
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

export default Gryffindor;