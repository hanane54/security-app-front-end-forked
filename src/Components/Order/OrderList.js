import { useEffect, useState } from "react";
import useHttp, { host } from "../../assets/requests";
import Spinner from "../ui/Spinner";
import styles from "./OrderList.module.css";

function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const { isLoading, error, sendRequest: getAllOrders } = useHttp();

  useEffect(() => {
    getAllOrders(
      {
        url: props.orderId
          ? host + `/orders/${props.orderId}`
          : host + `/orders`,
        method: "get",
      },
      (data) => {
        props.orderId ? setOrders([data]) : setOrders(data);
      }
    );
  }, [getAllOrders, props.orderId]);

  return (
    <div className={styles.card}>
      {!isLoading && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>order id</th>
              <th>client id</th>
              <th>client name</th>
              <th>order date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.client && order.client.client_id}</td>
                <td>
                  {order.client &&
                    order.client.first_name + " " + order.client.last_name}
                </td>
                <td>
                  {new Date(order.order_date).getDate() +
                    "-" +
                    new Date(order.order_date).getMonth() +
                    "-" +
                    new Date(order.order_date).getFullYear()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <Spinner />}
      {error && <p>* order id not found</p>}
    </div>
  );
}
export default OrderList;
