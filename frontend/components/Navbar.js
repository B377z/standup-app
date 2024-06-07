// frontend/components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={router.pathname === "/" ? styles.active : ""}>
          <Link href="/login">Home</Link>
        </li>
        <li className={router.pathname === "/submitProposal" ? styles.active : ""}>
          <Link href="/submitProposal">Submit a Proposal</Link>
        </li>
        <li className={router.pathname === "/events" ? styles.active : ""}>
          <Link href="/events">View Events</Link>
        </li>
        <li className={router.pathname === "/register" ? styles.active : ""}>
          <Link href="/register">Register for Events</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

