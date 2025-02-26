import logo from '../assets/logo.jpg';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles['cont-imagen']}>
      <img src={logo} alt="Logo" />
    </div>
  );
}
export default Home;