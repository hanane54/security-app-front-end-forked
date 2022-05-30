import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp, { host } from "../assets/requests";
import styles from './ReceptionPage.module.css';

const ReceptionPage = () => {
  const { clientId } = useParams("clientId");
//   const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const { isLoading, sendRequest: getClientOrders } = useHttp();

  useEffect(() => {
    clientId &&
      getClientOrders(
        {
          url: host + `/clients/${clientId}/orders`,
          method: "get",
        },
        (data) => {
          setOrders(data);
        }
      );
  }, [getClientOrders, clientId]);

  // console.log(clientId);
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
                  <td>{clientId }</td>
                  <td>
                    {new Date(order.order_date).getDate() +
                      "-" +
                      (new Date(order.order_date).getMonth() + 1) +
                      "-" +
                      new Date(order.order_date).getFullYear()}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
          {orders.length === 0 && <h1>client with ID :{clientId} has no orders</h1>}
      </div>
    </>
  );
};
export default ReceptionPage;
