import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp, { host } from "../../assets/requests";
import styles from "./ClientSelect.module.css";

function ClientSelect() {
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("0");

  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const { sendRequest: getAllClients } = useHttp();

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

  const clientNameHandler = (event) => {
    setClientName(event.target.value);
    setClientId(
      clients.filter(
        (client) =>
          client.first_name + " " + client.last_name === event.target.value
      )[0].client_id
    );
  };

  const { sendRequest: getClientOrders } = useHttp();
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

  return (
    <div className={styles.page}>
      <select onChange={clientNameHandler} value={clientName}>
        <option></option>
        {clients.map((client) => (
          <option key={client.client_id}>
            {client.first_name + " " + client.last_name}
          </option>
        ))}
      </select>
      <div className={styles.orderscontainer}>
        <div className={styles.header}>
          <img src="/images/orders.jpg" alt="orders" />
          <div className={styles.client}>
            <h3>{clientName}'s</h3>
            <p>orders</p>
          </div>
        </div>
        <div className={styles.orders}>
          {orders &&
            orders.map((order) => (
              <div className={styles.order} key={order.order_id}>
                <h3>order id {order.order_id}</h3>
                <h3>
                  {new Date(order.order_date).getDate() +
                    "-" +
                    (new Date(order.order_date).getMonth() + 1) +
                    "-" +
                    new Date(order.order_date).getFullYear()}
                </h3>
              </div>
            ))}
          {orders.length === 0 && <h1>{clientName} has no orders</h1>}
        </div>
      </div>
      <Link className={styles.link} to="/">
        Home
      </Link>
    </div>
  );
}
export default ClientSelect;
