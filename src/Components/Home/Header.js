import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1>Security</h1>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink className={styles.link} to="/clients">
              clients
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/orders">
              orders
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/clients-orders">
              clients orders
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/emission">
              SQL Injection
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/file-inclusion">
              File Inclusion
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
