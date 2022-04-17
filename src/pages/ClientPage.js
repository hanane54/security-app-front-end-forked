import { useState } from "react";
import { Link } from "react-router-dom";
import ClientForm from "../Components/Client/ClientForm";
import ClientList from "../Components/Client/ClientList";
import styles from "./ClientPage.module.css";

function ClientPage() {
  const [searchedClientId, setSearchedClientId] = useState("");
  const searchHandler = (id) => {
    setSearchedClientId(id);
    console.log(id);
  };
  return (
    <div className={styles.clients}>
      <h1>welcome to the clients page</h1>
      <ClientForm search={searchHandler} />
      <h1>searched clients</h1>
      <ClientList clientId={searchedClientId} />
      <Link className={styles.link} to="/">
        Home
      </Link>
    </div>
  );
}
export default ClientPage;
