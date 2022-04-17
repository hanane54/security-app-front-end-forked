import Header from "../Components/Home/Header";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.home}>
      <Header />
      <h1 className={styles.title}>Security matters</h1>
      <div className={styles.quote}>
        <h2>
          “Passwords are like underwear: don’t let people see it, change it very
          often, and you shouldn’t share it with strangers”
        </h2>
        <h2>
          “It takes 20 years to build a reputation and few minutes of
          cyber-incident to ruin it.”
        </h2>
      </div>
    </div>
  );
}
export default HomePage;
