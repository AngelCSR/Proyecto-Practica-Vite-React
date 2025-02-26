import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/spells">Hechizos</Link>
      <Link to="/characters">Personajes</Link>
      <Link to="/staff">Personal de Hogwarts</Link>
      <Link to="/gryffindor">Miembros de Griffindor</Link>
      <Link to="/ravenclaw">Miembros de Ravenclaw</Link>
    </nav>
  );
}
export default Navigation;