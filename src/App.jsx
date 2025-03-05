import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Spells from './Pages/Spells';
import Characters from './Pages/Characters';
import Staff from './Pages/Staff';
import Gryffindor from './Pages/Gryffindor';
import Ravenclaw from './Pages/Ravenclaw';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header title="Información sobre Harry Potter" />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<Spells />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/gryffindor" element={<Gryffindor />} />
        <Route path="/ravenclaw" element={<Ravenclaw />} />
      </Routes>
      <Footer text="@sddddddd   dddddddddd" />
    </BrowserRouter>
  );
}

export default App;