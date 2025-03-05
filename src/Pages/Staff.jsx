import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import styles from './Staff.module.css';

function Staff() {
    const [staff, setStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const staffPerPage = 9; // Cambiado a 9

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters/staff')
            .then(response => response.json())
            .then(data => setStaff(data));
    }, []);

    const indexOfLastStaff = currentPage * staffPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
    const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

    const totalPages = Math.ceil(staff.length / staffPerPage);

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
                {currentStaff.map(member => (
                    <CharacterCard 
                        key={member.id} 
                        character={member} 
                        className={styles['character-card']}
                        details={<p><strong>House:</strong> {member.house}</p>} 
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

export default Staff;