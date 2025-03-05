import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import styles from './Spells.module.css';

function Spells() {
    const [spells, setSpells] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const spellsPerPage = 9; // Cambiado a 9

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/spells')
            .then(response => response.json())
            .then(data => setSpells(data));
    }, []);

    const indexOfLastSpell = currentPage * spellsPerPage;
    const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
    const currentSpells = spells.slice(indexOfFirstSpell, indexOfLastSpell);

    const totalPages = Math.ceil(spells.length / spellsPerPage);

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
        {currentSpells.map(spell => (
            <CharacterCard 
                key={spell.id} 
                character={spell} 
                details={<p>{spell.description}</p>}
                className={styles['character-card']}
                
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

export default Spells;