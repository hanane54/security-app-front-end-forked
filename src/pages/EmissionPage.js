import React, { useEffect, useState } from "react";
import useHttp, { host } from "../assets/requests";
import { Link } from "react-router-dom";
import Spinner from "../Components/ui/Spinner";
import styles from "./EmissionPage.module.css";

const EmissionPage = () => {
  const [clients, setClients] = useState([]);
  const { isLoading, error, sendRequest: getAllClients } = useHttp();

  useEffect(() => {
    getAllClients(
      {
        url: host + `/clients`,
        method: "get",
      },
      (data) => {
        setClients(data);
      }
    );
  }, [getAllClients]);

  return (
    <div className={styles.ids}>
      {!isLoading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>client_ids</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.client_id}>
                <td>
                  <Link className={styles.link} to="/clientOrders/">
                    {client.client_id}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <Spinner />}
      {error && <p>* client id not found</p>}
    </div>
  );
};
export default EmissionPage;
