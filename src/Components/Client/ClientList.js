import { useEffect, useState } from "react";
import useHttp, { host } from "../../assets/requests";
import Spinner from "../ui/Spinner";
import styles from "./ClientList.module.css";

function ClientList(props) {
  const [clients, setClients] = useState([]);
  const { isLoading, error, sendRequest: getAllClients } = useHttp();

  useEffect(() => {
    getAllClients(
      {
        url: props.clientId
          ? host + `/clients/${props.clientId}`
          : host + `/clients`,
        method: "get",
      },
      (data) => {
        props.clientId ? setClients([data]) : setClients(data);
      }
    );
  }, [getAllClients, props.clientId]);

  return (
    <div className={styles.card}>
      {!isLoading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.client_id}>
                <td>{client.client_id}</td>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <Spinner />}
      {error && <p>* client id not found</p>}
    </div>
  );
}
export default ClientList;
