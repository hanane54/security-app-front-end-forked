import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp, { host } from "../assets/requests";
import styles from "./ReceptionPage.module.css";

const ReceptionPage = () => {
  const { clientId } = useParams("clientId");
  const [orders, setOrders] = useState([]);
  const { isLoading, sendRequest: getClientOrders } = useHttp();

  const [error, setError] = useState(false);

  // validate the data before sending it to the server
  // To prevent the SQL injection attack we considerd
  // verifying the clientId that will be sent in the url
  // does not contain any kind of special characters
  // that before sending it to the server.
  function validateSpecialChars(idTobeTested) {
    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (specialChars.test(idTobeTested)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {

    if (validateSpecialChars(clientId) || isNaN(clientId)) {
    // if(isNaN(clientId)){
      setError(true);
    } else {
      setError(false);
      getClientOrders(
        {
          url: host + `/clients/reception/${clientId}`,
          method: "get",
        },
        (data) => {
          // console.log(data)
          // console.log(clientId);
          setOrders(data);
        }
      );
    }
  }, [getClientOrders, clientId]);

  return (
    <>
      <div className={styles.orders}>
        {!isLoading && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Command Id</th>
                <th>Client Id</th>
                <th>Command Date</th>
                <th>Libelle Command</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.client.client_id}</td>
                  <td>
                    {new Date(order.orderDate).getDate() +
                      "-" +
                      (new Date(order.orderDate).getMonth() + 1) +
                      "-" +
                      new Date(order.orderDate).getFullYear()}
                  </td>
                  <td>{order.libelle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {orders.length === 0 && error && (
          <h1>client with invalid ID</h1>
        )}
      </div>
    </>
  );
};
export default ReceptionPage;
